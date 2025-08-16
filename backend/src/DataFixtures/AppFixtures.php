<?php

namespace App\DataFixtures;

use App\Entity\Event;
use App\Entity\Note;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(
        private UserPasswordHasherInterface $passwordHasher
    ) {}

    public function load(ObjectManager $manager): void
    {
        // Créer un utilisateur de test
        $user = new User();
        $user->setEmail('test@example.com');
        $user->setPassword($this->passwordHasher->hashPassword($user, 'password123'));
        $manager->persist($user);
        $manager->flush();

        // Créer des notes de test
        $notes = [
            [
                'title' => 'Réunion équipe projet',
                'description' => 'Préparation de la présentation client pour le nouveau projet de développement web. Révision des maquettes et validation des fonctionnalités.',
                'date' => new \DateTime('2024-01-15'),
                'category' => 'travail',
                'tag' => 'en-cours',
            ],
            [
                'title' => 'Cours de yoga',
                'description' => 'Séance de yoga hebdomadaire pour maintenir la forme et réduire le stress. Focus sur les postures de relaxation.',
                'date' => new \DateTime('2024-01-18'),
                'category' => 'personnel',
                'tag' => 'a-faire',
            ],
            [
                'title' => 'Formation React avancé',
                'description' => 'Apprentissage des hooks avancés et des patterns de performance. Mise en pratique sur un projet personnel.',
                'date' => new \DateTime('2024-01-12'),
                'category' => 'autre',
                'tag' => 'termine',
            ],
            [
                'title' => 'Rendez-vous dentiste',
                'description' => 'Contrôle annuel et détartrage. Vérifier si besoin de soins supplémentaires.',
                'date' => new \DateTime('2024-01-20'),
                'category' => 'personnel',
                'tag' => 'a-faire',
            ],
            [
                'title' => 'Présentation projet final',
                'description' => 'Finalisation de la présentation pour le projet de fin d\'année. Préparer les slides et répéter le pitch.',
                'date' => new \DateTime('2024-01-25'),
                'category' => 'travail',
                'tag' => 'en-cours',
            ],
        ];

        foreach ($notes as $noteData) {
            $note = new Note();
            $note->setTitle($noteData['title']);
            $note->setDescription($noteData['description']);
            $note->setDate($noteData['date']);
            $note->setCategory($noteData['category']);
            $note->setTag($noteData['tag']);
            $note->setUser($user);

            $manager->persist($note);
        }

        // Créer des événements de test
        $events = [
            [
                'title' => 'Réunion équipe',
                'description' => 'Point hebdomadaire avec l\'équipe de développement',
                'date' => new \DateTime('2024-12-25'),
                'startTime' => '09:00',
                'endTime' => '10:30',
                'category' => 'travail',
                'tag' => 'a-faire',
            ],
            [
                'title' => 'Rendez-vous médecin',
                'description' => 'Consultation de routine',
                'date' => new \DateTime('2024-12-26'),
                'startTime' => '14:00',
                'endTime' => '15:00',
                'category' => 'personnel',
                'tag' => 'a-faire',
            ],
            [
                'title' => 'Conférence tech',
                'description' => 'Présentation sur les nouvelles technologies web',
                'date' => new \DateTime('2024-12-28'),
                'startTime' => '10:00',
                'endTime' => '17:00',
                'category' => 'autre',
                'tag' => 'en-cours',
            ],
            [
                'title' => 'Cours de piano',
                'description' => 'Leçon hebdomadaire de piano. Réviser les morceaux pour le concert.',
                'date' => new \DateTime('2024-12-27'),
                'startTime' => '16:00',
                'endTime' => '17:00',
                'category' => 'personnel',
                'tag' => 'en-cours',
            ],
            [
                'title' => 'Réunion client',
                'description' => 'Présentation des avancées du projet et validation des prochaines étapes.',
                'date' => new \DateTime('2024-12-29'),
                'startTime' => '11:00',
                'endTime' => '12:30',
                'category' => 'travail',
                'tag' => 'a-faire',
            ],
        ];

        foreach ($events as $eventData) {
            $event = new Event();
            $event->setTitle($eventData['title']);
            $event->setDescription($eventData['description']);
            $event->setDate($eventData['date']);
            $event->setStartTime($eventData['startTime']);
            $event->setEndTime($eventData['endTime']);
            $event->setCategory($eventData['category']);
            $event->setTag($eventData['tag']);
            $event->setUser($user);

            $manager->persist($event);
        }

        $manager->flush();
    }
}
