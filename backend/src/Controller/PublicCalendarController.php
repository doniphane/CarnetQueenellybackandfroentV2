<?php

namespace App\Controller;

use App\Entity\PublicCalendar;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api')]
class PublicCalendarController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private JWTTokenManagerInterface $jwtManager,
        private UserRepository $userRepository,
        private SerializerInterface $serializer
    ) {
    }

    #[Route('/public_calendars', name: 'api_public_calendars_get', methods: ['GET'])]
    public function getPublicCalendars(Request $request): JsonResponse
    {
        try {
            // Récupérer tous les calendriers publics actifs
            $calendars = $this->entityManager->getRepository(PublicCalendar::class)
                ->findBy(['isActive' => true]);

            $data = $this->serializer->serialize($calendars, 'json', ['groups' => 'public_calendar:read']);
            return new JsonResponse(json_decode($data, true), Response::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/public_calendars', name: 'api_public_calendars_create', methods: ['POST'])]
    public function createPublicCalendar(Request $request): JsonResponse
    {
        try {
            // Récupérer l'utilisateur depuis le token JWT
            $user = $this->getUserFromToken($request);
            if (!$user) {
                return new JsonResponse(['error' => 'Utilisateur non authentifié'], Response::HTTP_UNAUTHORIZED);
            }

            $data = json_decode($request->getContent(), true);

            $calendar = new PublicCalendar();
            $calendar->setName($data['name']);
            $calendar->setDescription($data['description']);
            $calendar->setColor($data['color']);
            $calendar->setOwnerId($user->getId());
            $calendar->setOwnerName($user->getEmail()); // Utiliser l'email comme nom
            $calendar->setOwnerEmail($user->getEmail());
            $calendar->setIsActive(true);

            $this->entityManager->persist($calendar);
            $this->entityManager->flush();

            $responseData = $this->serializer->serialize($calendar, 'json', ['groups' => 'public_calendar:read']);
            return new JsonResponse(json_decode($responseData, true), Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/public_calendars/{id}', name: 'api_public_calendars_update', methods: ['PATCH'])]
    public function updatePublicCalendar(Request $request, int $id): JsonResponse
    {
        try {
            // Récupérer l'utilisateur depuis le token JWT
            $user = $this->getUserFromToken($request);
            if (!$user) {
                return new JsonResponse(['error' => 'Utilisateur non authentifié'], Response::HTTP_UNAUTHORIZED);
            }

            $calendar = $this->entityManager->getRepository(PublicCalendar::class)->find($id);
            if (!$calendar) {
                return new JsonResponse(['error' => 'Calendrier non trouvé'], Response::HTTP_NOT_FOUND);
            }

            // Vérifier que l'utilisateur est le propriétaire du calendrier
            if ($calendar->getOwnerId() !== $user->getId()) {
                return new JsonResponse(['error' => 'Seul le propriétaire du calendrier peut le modifier'], Response::HTTP_FORBIDDEN);
            }

            $data = json_decode($request->getContent(), true);

            if (isset($data['name'])) {
                $calendar->setName($data['name']);
            }
            if (isset($data['description'])) {
                $calendar->setDescription($data['description']);
            }
            if (isset($data['color'])) {
                $calendar->setColor($data['color']);
            }
            if (isset($data['isActive'])) {
                $calendar->setIsActive($data['isActive']);
            }

            $this->entityManager->flush();

            $responseData = $this->serializer->serialize($calendar, 'json', ['groups' => 'public_calendar:read']);
            return new JsonResponse(json_decode($responseData, true), Response::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/public_calendars/{id}', name: 'api_public_calendars_delete', methods: ['DELETE'])]
    public function deletePublicCalendar(Request $request, int $id): JsonResponse
    {
        try {
            // Récupérer l'utilisateur depuis le token JWT
            $user = $this->getUserFromToken($request);
            if (!$user) {
                return new JsonResponse(['error' => 'Utilisateur non authentifié'], Response::HTTP_UNAUTHORIZED);
            }

            $calendar = $this->entityManager->getRepository(PublicCalendar::class)->find($id);
            if (!$calendar) {
                return new JsonResponse(['error' => 'Calendrier non trouvé'], Response::HTTP_NOT_FOUND);
            }

            // Vérifier que l'utilisateur est le propriétaire du calendrier
            if ($calendar->getOwnerId() !== $user->getId()) {
                return new JsonResponse(['error' => 'Seul le propriétaire du calendrier peut le supprimer'], Response::HTTP_FORBIDDEN);
            }

            $this->entityManager->remove($calendar);
            $this->entityManager->flush();

            return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    private function getUserFromToken(Request $request): ?User
    {
        $authHeader = $request->headers->get('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return null;
        }

        $token = substr($authHeader, 7);

        try {
            $payload = $this->jwtManager->parse($token);
            $email = $payload['username'] ?? null;

            if ($email) {
                return $this->userRepository->findOneBy(['email' => $email]);
            }
        } catch (\Exception $e) {
            return null;
        }

        return null;
    }
}