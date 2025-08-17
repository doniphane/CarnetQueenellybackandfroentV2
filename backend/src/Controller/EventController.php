<?php

namespace App\Controller;

use App\Entity\Event;
use App\Entity\User;
use App\Repository\EventRepository;
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
class EventController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private JWTTokenManagerInterface $jwtManager,
        private UserRepository $userRepository,
        private SerializerInterface $serializer
    ) {
    }

    #[Route('/events', name: 'api_events_get', methods: ['GET'])]
    public function getEvents(Request $request): JsonResponse
    {
        try {
            // Récupérer l'utilisateur depuis le token JWT
            $user = $this->getUserFromToken($request);
            if (!$user) {
                return new JsonResponse(['error' => 'Utilisateur non authentifié'], Response::HTTP_UNAUTHORIZED);
            }

            $events = $this->entityManager->getRepository(Event::class)->findBy(['user' => $user]);

            $data = $this->serializer->serialize($events, 'json', ['groups' => 'event:read']);
            return new JsonResponse(json_decode($data, true), Response::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/events', name: 'api_events_create', methods: ['POST'])]
    public function createEvent(Request $request): JsonResponse
    {
        try {
            // Récupérer l'utilisateur depuis le token JWT
            $user = $this->getUserFromToken($request);
            if (!$user) {
                return new JsonResponse(['error' => 'Utilisateur non authentifié'], Response::HTTP_UNAUTHORIZED);
            }

            $data = json_decode($request->getContent(), true);

            $event = new Event();
            $event->setTitle($data['title']);
            $event->setDescription($data['description']);
            $event->setDate(new \DateTime($data['date']));
            $event->setStartTime($data['startTime']);
            $event->setEndTime($data['endTime']);
            $event->setCategory($data['category']);
            $event->setTag($data['tag']);
            $event->setUser($user);

            $this->entityManager->persist($event);
            $this->entityManager->flush();

            $responseData = $this->serializer->serialize($event, 'json', ['groups' => 'event:read']);
            return new JsonResponse(json_decode($responseData, true), Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/events/{id}', name: 'api_events_update', methods: ['PATCH'])]
    public function updateEvent(Request $request, int $id): JsonResponse
    {
        try {
            // Récupérer l'utilisateur depuis le token JWT
            $user = $this->getUserFromToken($request);
            if (!$user) {
                return new JsonResponse(['error' => 'Utilisateur non authentifié'], Response::HTTP_UNAUTHORIZED);
            }

            $event = $this->entityManager->getRepository(Event::class)->find($id);
            if (!$event) {
                return new JsonResponse(['error' => 'Événement non trouvé'], Response::HTTP_NOT_FOUND);
            }

            // Vérifier que l'utilisateur est propriétaire de l'événement
            if ($event->getUser()->getId() !== $user->getId()) {
                return new JsonResponse(['error' => 'Accès non autorisé'], Response::HTTP_FORBIDDEN);
            }

            $data = json_decode($request->getContent(), true);

            if (isset($data['title'])) {
                $event->setTitle($data['title']);
            }
            if (isset($data['description'])) {
                $event->setDescription($data['description']);
            }
            if (isset($data['date'])) {
                $event->setDate(new \DateTime($data['date']));
            }
            if (isset($data['startTime'])) {
                $event->setStartTime($data['startTime']);
            }
            if (isset($data['endTime'])) {
                $event->setEndTime($data['endTime']);
            }
            if (isset($data['category'])) {
                $event->setCategory($data['category']);
            }
            if (isset($data['tag'])) {
                $event->setTag($data['tag']);
            }

            $this->entityManager->flush();

            $responseData = $this->serializer->serialize($event, 'json', ['groups' => 'event:read']);
            return new JsonResponse(json_decode($responseData, true), Response::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/events/{id}', name: 'api_events_delete', methods: ['DELETE'])]
    public function deleteEvent(Request $request, int $id): JsonResponse
    {
        try {
            // Récupérer l'utilisateur depuis le token JWT
            $user = $this->getUserFromToken($request);
            if (!$user) {
                return new JsonResponse(['error' => 'Utilisateur non authentifié'], Response::HTTP_UNAUTHORIZED);
            }

            $event = $this->entityManager->getRepository(Event::class)->find($id);
            if (!$event) {
                return new JsonResponse(['error' => 'Événement non trouvé'], Response::HTTP_NOT_FOUND);
            }

            // Vérifier que l'utilisateur est propriétaire de l'événement
            if ($event->getUser()->getId() !== $user->getId()) {
                return new JsonResponse(['error' => 'Accès non autorisé'], Response::HTTP_FORBIDDEN);
            }

            $this->entityManager->remove($event);
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