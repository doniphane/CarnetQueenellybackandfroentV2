<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Contrôleur pour gérer les requêtes CORS preflight
 * Ce contrôleur évite les redirections qui causent des erreurs CORS
 */
class CorsController extends AbstractController
{
    /**
     * Gère les requêtes OPTIONS pour les endpoints API
     * Cette route doit être définie avant les autres routes API
     */
    #[Route('/api/{path}', name: 'api_cors_preflight', methods: ['OPTIONS'], requirements: ['path' => '.*'])]
    public function handlePreflight(): Response
    {
        $response = new Response();

        // Headers CORS pour permettre les requêtes cross-origin
        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:3000');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, X-Requested-With');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        $response->headers->set('Access-Control-Max-Age', '3600');

        return $response;
    }
}