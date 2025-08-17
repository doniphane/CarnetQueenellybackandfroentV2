<?php

namespace App\Controller;

use App\Entity\PublicCalendarEvent;
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
class PublicCalendarEventController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private JWTTokenManagerInterface $jwtManager,
        private UserRepository $userRepository,
        private SerializerInterface $serializer
    ) {
    }

    #[Route('/public_calendar_events', name: 'api_public_calendar_events_get', methods: ['GET'])]
    public function getPublicCalendarEvents(Request $request): JsonResponse
    {
        try {
            $calendarId = $request->query->get('calendarId');

            if (!$calendarId) {
                return new JsonResponse(['error' => 'ID du calendrier requis'], Response::HTTP_BAD_REQUEST);
            }

            $events = $this->entityManager->getRepository(PublicCalendarEvent::class)
                ->findBy(['calendarId' => $calendarId]);

            $data = $this->serializer->serialize($events, 'json', ['groups' => 'public_calendar_event:read']);
            return new JsonResponse(json_decode($data, true), Response::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/public_calendar_events', name: 'api_public_calendar_events_create', methods: ['POST'])]
    public function createPublicCalendarEvent(Request $request): JsonResponse
    {
        try {
            // Récupérer l'utilisateur depuis le token JWT
            $user = $this->getUserFromToken($request);
            if (!$user) {
                return new JsonResponse(['error' => 'Utilisateur non authentifié'], Response::HTTP_UNAUTHORIZED);
            }

            $data = json_decode($request->getContent(), true);
            $calendarId = $data['calendarId'];

            // Vérifier que l'utilisateur est le propriétaire du calendrier
            $calendar = $this->entityManager->getRepository(PublicCalendar::class)->find($calendarId);
            if (!$calendar) {
                return new JsonResponse(['error' => 'Calendrier non trouvé'], Response::HTTP_NOT_FOUND);
            }

            if ($calendar->getOwnerId() !== $user->getId()) {
                return new JsonResponse(['error' => 'Seul le propriétaire du calendrier peut ajouter des événements'], Response::HTTP_FORBIDDEN);
            }

            $event = new PublicCalendarEvent();
            $event->setCalendarId($calendarId);
            $event->setTitle($data['title']);
            $event->setDescription($data['description']);
            $event->setDate(new \DateTime($data['date']));
            $event->setStartTime($data['startTime']);
            $event->setEndTime($data['endTime']);
            $event->setCategory($data['category']);
            $event->setTag($data['tag']);

            $this->entityManager->persist($event);
            $this->entityManager->flush();

            $responseData = $this->serializer->serialize($event, 'json', ['groups' => 'public_calendar_event:read']);
            return new JsonResponse(json_decode($responseData, true), Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/public_calendar_events/{id}', name: 'api_public_calendar_events_update', methods: ['PATCH'])]
    public function updatePublicCalendarEvent(Request $request, int $id): JsonResponse
    {
        try {
            // Récupérer l'utilisateur depuis le token JWT
            $user = $this->getUserFromToken($request);
            if (!$user) {
                return new JsonResponse(['error' => 'Utilisateur non authentifié'], Response::HTTP_UNAUTHORIZED);
            }

            $event = $this->entityManager->getRepository(PublicCalendarEvent::class)->find($id);
            if (!$event) {
                return new JsonResponse(['error' => 'Événement non trouvé'], Response::HTTP_NOT_FOUND);
            }

            // Vérifier que l'utilisateur est le propriétaire du calendrier
            $calendar = $this->entityManager->getRepository(PublicCalendar::class)->find($event->getCalendarId());
            if (!$calendar) {
                return new JsonResponse(['error' => 'Calendrier non trouvé'], Response::HTTP_NOT_FOUND);
            }

            if ($calendar->getOwnerId() !== $user->getId()) {
                return new JsonResponse(['error' => 'Seul le propriétaire du calendrier peut modifier les événements'], Response::HTTP_FORBIDDEN);
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

            $responseData = $this->serializer->serialize($event, 'json', ['groups' => 'public_calendar_event:read']);
            return new JsonResponse(json_decode($responseData, true), Response::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/public_calendar_events/{id}', name: 'api_public_calendar_events_delete', methods: ['DELETE'])]
    public function deletePublicCalendarEvent(Request $request, int $id): JsonResponse
    {
        try {
            // Récupérer l'utilisateur depuis le token JWT
            $user = $this->getUserFromToken($request);
            if (!$user) {
                return new JsonResponse(['error' => 'Utilisateur non authentifié'], Response::HTTP_UNAUTHORIZED);
            }

            $event = $this->entityManager->getRepository(PublicCalendarEvent::class)->find($id);
            if (!$event) {
                return new JsonResponse(['error' => 'Événement non trouvé'], Response::HTTP_NOT_FOUND);
            }

            // Vérifier que l'utilisateur est le propriétaire du calendrier
            $calendar = $this->entityManager->getRepository(PublicCalendar::class)->find($event->getCalendarId());
            if (!$calendar) {
                return new JsonResponse(['error' => 'Calendrier non trouvé'], Response::HTTP_NOT_FOUND);
            }

            if ($calendar->getOwnerId() !== $user->getId()) {
                return new JsonResponse(['error' => 'Seul le propriétaire du calendrier peut supprimer les événements'], Response::HTTP_FORBIDDEN);
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