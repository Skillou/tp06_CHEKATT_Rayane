<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

$paths = array("/../vendor/src/models");
$isDevMode = false;

$config = Setup::createYAMLMetadataConfiguration(array(__DIR__."/config/yaml"), $isDevMode);

$dbParams = array(
    'driver' => 'pdo_pgsql',
    'user' => 'Skillou',
    'password' => 'rayanedu67',
    'dbname' => 'db_tp_skillou',
    'host' => 'localhost',
    'port' => '5432',
);

// $config = Setup::createAnnotationMetadataConfiguration($paths, $isDevMode);

$entityManager = EntityManager::create($dbParams, $config);
