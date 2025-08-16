<?php

namespace App\Controller;

use App\Repository\EventRepository;
use App\Repository\NoteRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/dashboard')]
class DashboardController extends AbstractController
{
    public function __construct(
        private NoteRepository $noteRepository,
        private EventRepository $eventRepository
    ) {
    }

    #[Route('/stats', name: 'api_dashboard_stats', methods: ['GET'])]
    public function getStats(): JsonResponse
    {
        // Récupérer les statistiques des notes
        $totalNotes = $this->noteRepository->count([]);
        $notesEnCours = $this->noteRepository->count(['tag' => 'en-cours']);
        $notesTerminees = $this->noteRepository->count(['tag' => 'termine']);
        $notesAFaire = $this->noteRepository->count(['tag' => 'a-faire']);

        // Récupérer les statistiques des événements
        $totalEvents = $this->eventRepository->count([]);
        $eventsEnCours = $this->eventRepository->count(['tag' => 'en-cours']);
        $eventsTermines = $this->eventRepository->count(['tag' => 'termine']);
        $eventsAFaire = $this->eventRepository->count(['tag' => 'a-faire']);

        // Récupérer les activités récentes
        $recentNotes = $this->noteRepository->findBy([], ['createdAt' => 'DESC'], 5);
        $recentEvents = $this->eventRepository->findBy([], ['createdAt' => 'DESC'], 5);

        return $this->json([
            'notes' => [
                'total' => $totalNotes,
                'enCours' => $notesEnCours,
                'terminees' => $notesTerminees,
                'aFaire' => $notesAFaire,
            ],
            'events' => [
                'total' => $totalEvents,
                'enCours' => $eventsEnCours,
                'termines' => $eventsTermines,
                'aFaire' => $eventsAFaire,
            ],
            'recentActivity' => [
                'notes' => array_map(function ($note) {
                    return [
                        'id' => $note->getId(),
                        'title' => $note->getTitle(),
                        'category' => $note->getCategory(),
                        'tag' => $note->getTag(),
                        'createdAt' => $note->getCreatedAt()->format('Y-m-d H:i:s'),
                    ];
                }, $recentNotes),
                'events' => array_map(function ($event) {
                    return [
                        'id' => $event->getId(),
                        'title' => $event->getTitle(),
                        'category' => $event->getCategory(),
                        'tag' => $event->getTag(),
                        'date' => $event->getDate()->format('Y-m-d'),
                        'createdAt' => $event->getCreatedAt()->format('Y-m-d H:i:s'),
                    ];
                }, $recentEvents),
            ],
        ]);
    }
}
