<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManager;

class UserController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserPasswordHasherInterface $passwordHasher,
        private JWTTokenManagerInterface $jwtManager
    ) {
    }

    #[Route('/api/users/register', name: 'api_user_register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data || !isset($data['email']) || !isset($data['password'])) {
            return $this->json([
                'error' => 'Email et mot de passe requis'
            ], Response::HTTP_BAD_REQUEST);
        }

        $email = $data['email'];
        $password = $data['password'];

        // Vérifier si l'utilisateur existe déjà
        $existingUser = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
        if ($existingUser) {
            return $this->json([
                'error' => 'Un utilisateur avec cet email existe déjà'
            ], Response::HTTP_CONFLICT);
        }

        // Créer le nouvel utilisateur
        $user = new User();
        $user->setEmail($email);
        $user->setPassword($this->passwordHasher->hashPassword($user, $password));

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        // Générer le token JWT
        $token = $this->jwtManager->create($user);

        return $this->json([
            'message' => 'Utilisateur créé avec succès',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
            ],
            'token' => $token
        ], Response::HTTP_CREATED);
    }

    #[Route('/api/users/login', name: 'api_user_login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data || !isset($data['email']) || !isset($data['password'])) {
            return $this->json([
                'error' => 'Email et mot de passe requis'
            ], Response::HTTP_BAD_REQUEST);
        }

        $email = $data['email'];
        $password = $data['password'];

        // Trouver l'utilisateur
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
        if (!$user) {
            return $this->json([
                'error' => 'Email ou mot de passe incorrect'
            ], Response::HTTP_UNAUTHORIZED);
        }

        // Vérifier le mot de passe
        if (!$this->passwordHasher->isPasswordValid($user, $password)) {
            return $this->json([
                'error' => 'Email ou mot de passe incorrect'
            ], Response::HTTP_UNAUTHORIZED);
        }

        // Générer le token JWT
        $token = $this->jwtManager->create($user);

        return $this->json([
            'message' => 'Connexion réussie',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
            ],
            'token' => $token
        ]);
    }

    #[Route('/api/users/me', name: 'api_user_me', methods: ['GET'])]
    public function me(Request $request): JsonResponse
    {
        // Récupérer le token depuis le header Authorization
        $authHeader = $request->headers->get('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return $this->json([
                'error' => 'Token d\'authentification manquant'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = substr($authHeader, 7); // Enlever "Bearer "

        try {
            // Valider le token JWT
            $payload = $this->jwtManager->parse($token);

            if (!isset($payload['username'])) {
                return $this->json([
                    'error' => 'Token invalide'
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Récupérer l'utilisateur depuis la base de données
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $payload['username']]);

            if (!$user) {
                return $this->json([
                    'error' => 'Utilisateur non trouvé'
                ], Response::HTTP_UNAUTHORIZED);
            }

            return $this->json([
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                ]
            ]);

        } catch (JWTDecodeFailureException $e) {
            return $this->json([
                'error' => 'Token invalide ou expiré'
            ], Response::HTTP_UNAUTHORIZED);
        } catch (\Exception $e) {
            return $this->json([
                'error' => 'Erreur lors de la validation du token'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/api/users/logout', name: 'api_user_logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        // Pour JWT, la déconnexion se fait côté client en supprimant le token
        return $this->json([
            'message' => 'Déconnexion réussie'
        ]);
    }
}
