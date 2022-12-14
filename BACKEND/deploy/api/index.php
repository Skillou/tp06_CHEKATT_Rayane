<?php
// php -S localhost:8080 -t api api/index.php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
    header("HTTP/1.1 200 OK");
    die();
}

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../bootstrap.php';

const JWT_SECRET = "Skillou67JwtSecret";

$app = AppFactory::create();

function createJwT (Response $response) : Response {
    $issuedAt = time();
    $expirationTime = $issuedAt + 60;
    $payload = array(
    'userid' => '667',
    'email' => 'rayane@gmail.com',
    'pseudo' => 'Skillou',
    'iat' => $issuedAt,
    'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    return $response;
}

// GET

$app->get('{name}', function (Request $request, Response $response, $args) {
    $array = [];
    $array ["nom"] = $args ['name'];
    $response->getBody()->write(json_encode ($array));
    return $response;
});

$app->get('/api/user', function (Request $request, Response $response, $args) {   
    $data = array('nom' => 'toto', 'prenom' => 'titi','adresse' => '6 rue des fleurs', 'tel' => '0606060607');
    $response->getBody()->write(json_encode($data));

    return $response;
});

// POST

// APi d'authentification g??n??rant un JWT
$app->post('/api/login', function (Request $request, Response $response, $args) {   
    $err=false;
    $body = $request->getParsedBody();
    $login = $body ['login'] ?? "";
    $pass = $body ['pass'] ?? "";

    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$login))   {
        $err = true;
    }
    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$pass))  {
        $err=true;
    }

    if (!$err) {
            $response = createJwT ($response);
            $data = array('nom' => 'Skillou', 'prenom' => 'Rayoux');
            $response->getBody()->write(json_encode($data));
     } else {          
            $response = $response->withStatus(401);
     }
    return $response;
});

// DEL

$app->delete('/api/user/{id}', function (Request $request, Response $response, $args) {

    // Logique delete

        // Supprimer un produit
        // $id = intval($_GET["id"]);
        // deleteProduct($id);
        // break;

    return $response;
});



///////////////////////////
// API Catalogue Produit //
//////////////////////////

$filename = './assets/mock/produits.json';
$data = file_get_contents($filename);
$array = json_decode($data);

// if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//   // R??cup??rer tous les enregistrements
//   $repository = $entityManager->getRepository(Product::class);
//   $products = $repository->findAll();
//   echo json_encode($products);
// }

// $app->get('/api/catalogue', function (Request $request, Response $response, $args) {
//     global $array;
//     $response->getBody()->write(json_encode ($array));
//     return $response;
// });

$app->get('/api/catalogue', function (Request $request, Response $response) use ($entityManager) {
    $products = $entityManager->getRepository('Product')->findAll();
    return $response->withJson($products);
});

$app->get('/api/catalogue/{id}', function (Request $request, Response $response, $args) {
    global $array;
    $id = $args ['id'];
    $array = $array[$id - 1];
    $response->getBody()->write(json_encode ($array));
    return $response;
});

$app->post('/api/catalogue/add', function (Request $request, Response $response, $args) {
    // Read the JSON file into a PHP object
    global $array;

    // Read the JSON file into a string
    $json = json_encode($array, true);

    // Append a new item to the end of the string
    $item = array(
    'id' => 123,
    'name' => 'Livre de fou',
    'description' => 'Ceci est un livre',
    'price' => 4.5,
    'category' => "livre",
    'image' => '',
    'summary' => 'Livre description'
    );

    $testJson = substr($json, 0, -1).','.json_encode($item).']';

    file_put_contents('./assets/mock/produits.json', $testJson, FILE_APPEND);

    $response->getBody()->write($testJson);

    // $response->getBody()->write(json_encode ($array));

    // $json = substr($json, 0, -1).','.json_encode($item).']';

    // file_put_contents('./assets/mock/produits.json', $json, FILE_APPEND);

    // $response->getBody()->write(json_encode ($array));

    return $response;
});

$app->put('/api/catalogue/{id}', function ($request, $response, $args) {
    // Update book identified by $args['id']
    // ...

    return $response;
});

$app->delete('/api/catalogue/{id}', function ($request, $response, $args) {
    // Delete book identified by $args['id']
    // ...

    return $response;
});

$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/hello","/api/login","/api/createUser", "/api/catalogue"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'Le token JWT est invalide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->run ();

// GET /contrats              -> R??cup??re tous les contrats
// POST /contrats             -> Cr??e un contrat 
// GET /contrats/12           -> R??cup??re le contrat identifi?? par 12
// PUT /contrats/12           -> Modifie le contrat 12  
// DELETE /contrats/12        -> Supprime le contrat 1