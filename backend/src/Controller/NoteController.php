<?php

namespace App\Controller;

use App\Entity\Note;
use App\Repository\NoteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api')]
class NoteController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private SerializerInterface $serializer
    ) {
    }

    #[Route('/notes', name: 'api_notes_get', methods: ['GET'])]
    public function getNotes(Request $request): JsonResponse
    {
        try {
            // Récupérer toutes les notes (publiques)
            $notes = $this->entityManager->getRepository(Note::class)->findAll();

            $data = $this->serializer->serialize($notes, 'json', ['groups' => 'note:read']);
            return new JsonResponse(json_decode($data, true), Response::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/notes', name: 'api_notes_create', methods: ['POST'])]
    public function createNote(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            $note = new Note();
            $note->setTitle($data['title']);
            $note->setDescription($data['description']);
            $note->setDate(new \DateTime($data['date']));
            $note->setCategory($data['category']);
            $note->setTag($data['tag']);
            // Pas d'utilisateur associé - note publique

            $this->entityManager->persist($note);
            $this->entityManager->flush();

            $responseData = $this->serializer->serialize($note, 'json', ['groups' => 'note:read']);
            return new JsonResponse(json_decode($responseData, true), Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/notes/{id}', name: 'api_notes_update', methods: ['PATCH'])]
    public function updateNote(Request $request, int $id): JsonResponse
    {
        try {
            $note = $this->entityManager->getRepository(Note::class)->find($id);
            if (!$note) {
                return new JsonResponse(['error' => 'Note non trouvée'], Response::HTTP_NOT_FOUND);
            }

            $data = json_decode($request->getContent(), true);

            if (isset($data['title'])) {
                $note->setTitle($data['title']);
            }
            if (isset($data['description'])) {
                $note->setDescription($data['description']);
            }
            if (isset($data['date'])) {
                $note->setDate(new \DateTime($data['date']));
            }
            if (isset($data['category'])) {
                $note->setCategory($data['category']);
            }
            if (isset($data['tag'])) {
                $note->setTag($data['tag']);
            }

            $this->entityManager->flush();

            $responseData = $this->serializer->serialize($note, 'json', ['groups' => 'note:read']);
            return new JsonResponse(json_decode($responseData, true), Response::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/notes/{id}', name: 'api_notes_delete', methods: ['DELETE'])]
    public function deleteNote(Request $request, int $id): JsonResponse
    {
        try {
            $note = $this->entityManager->getRepository(Note::class)->find($id);
            if (!$note) {
                return new JsonResponse(['error' => 'Note non trouvée'], Response::HTTP_NOT_FOUND);
            }

            $this->entityManager->remove($note);
            $this->entityManager->flush();

            return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}