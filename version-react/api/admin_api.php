<?php
/**
 * admin_api.php — API d'administration Code-Clic
 * Les secrets sont centralisés dans config.php (non commité).
 */

require 'config.php';

// --- CORS ---
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, CORS_ORIGINS)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: *");
}
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- Auth helpers ---
function getToken(): string
{
    // $_SERVER['HTTP_AUTHORIZATION'] n'est pas toujours transmis par Apache
    $h = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!$h) {
        $all = function_exists('getallheaders') ? getallheaders() : [];
        $h = $all['Authorization'] ?? $all['authorization'] ?? '';
    }
    if (preg_match('/^Bearer\s+(.+)$/i', $h, $m)) {
        return $m[1];
    }
    return '';
}

function requireAuth(): void
{
    if (getToken() !== ADMIN_TOKEN) {
        http_response_code(401);
        echo json_encode(['error' => 'Non autorisé']);
        exit();
    }
}

// --- DB ---
function db(): PDO
{
    static $pdo;
    if (!$pdo) {
        $pdo = new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8',
            DB_USER,
            DB_PASS,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
    }
    return $pdo;
}

// --- Router ---
$method = $_SERVER['REQUEST_METHOD'];
$body = json_decode(file_get_contents('php://input'), true) ?? [];
$action = $_GET['action'] ?? $body['action'] ?? '';

try {

    // POST /admin_api.php  { action: "login", password: "..." }
    if ($method === 'POST' && $action === 'login') {
        $pass = $body['password'] ?? '';
        if ($pass === ADMIN_PASSWORD) {
            echo json_encode(['token' => ADMIN_TOKEN]);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Mot de passe incorrect']);
        }
        exit();
    }

    // All routes below require authentication
    requireAuth();

    // GET ?action=list
    if ($method === 'GET' && $action === 'list') {
        $rows = db()
            ->query('SELECT id, nom, prenom, email, statut, message, date_inscription
                     FROM inscriptions_codeclic
                     ORDER BY date_inscription DESC')
            ->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['inscriptions' => $rows]);
        exit();
    }

    // GET ?action=stats
    if ($method === 'GET' && $action === 'stats') {
        $pdo = db();
        $total = (int) $pdo->query('SELECT COUNT(*) FROM inscriptions_codeclic')->fetchColumn();

        $lastWeek = (int) $pdo
            ->query("SELECT COUNT(*) FROM inscriptions_codeclic WHERE date_inscription >= DATE_SUB(NOW(), INTERVAL 7 DAY)")
            ->fetchColumn();

        $rows = $pdo
            ->query('SELECT statut, COUNT(*) AS cnt FROM inscriptions_codeclic GROUP BY statut')
            ->fetchAll(PDO::FETCH_ASSOC);

        $byStatut = [];
        foreach ($rows as $r) {
            $byStatut[$r['statut']] = (int) $r['cnt'];
        }

        echo json_encode([
            'total' => $total,
            'last_week' => $lastWeek,
            'by_statut' => $byStatut,
        ]);
        exit();
    }

    // DELETE ?action=delete&id=X
    if ($method === 'DELETE' && $action === 'delete') {
        $id = (int) ($_GET['id'] ?? 0);
        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(['error' => 'ID invalide']);
            exit();
        }
        $stmt = db()->prepare('DELETE FROM inscriptions_codeclic WHERE id = ?');
        $stmt->execute([$id]);
        echo json_encode(['success' => true, 'deleted' => $id]);
        exit();
    }

    http_response_code(404);
    echo json_encode(['error' => 'Action inconnue']);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur base de données']);
}
