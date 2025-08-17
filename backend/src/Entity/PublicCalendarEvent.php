<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'public_calendar_events')]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['public_calendar_event:read']]
        ),
        new Post(
            normalizationContext: ['groups' => ['public_calendar_event:read']],
            denormalizationContext: ['groups' => ['public_calendar_event:write']]
        ),
        new Get(
            normalizationContext: ['groups' => ['public_calendar_event:read']]
        ),
        new Put(
            normalizationContext: ['groups' => ['public_calendar_event:read']],
            denormalizationContext: ['groups' => ['public_calendar_event:write']]
        ),
        new Delete(),
    ]
)]
class PublicCalendarEvent
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['public_calendar_event:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['public_calendar_event:read', 'public_calendar_event:write'])]
    private ?int $calendarId = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 1, max: 255)]
    #[Groups(['public_calendar_event:read', 'public_calendar_event:write'])]
    private ?string $title = null;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank]
    #[Groups(['public_calendar_event:read', 'public_calendar_event:write'])]
    private ?string $description = null;

    #[ORM\Column(type: 'date')]
    #[Assert\NotNull]
    #[Groups(['public_calendar_event:read', 'public_calendar_event:write'])]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(length: 5)]
    #[Assert\NotBlank]
    #[Assert\Regex('/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/')]
    #[Groups(['public_calendar_event:read', 'public_calendar_event:write'])]
    private ?string $startTime = null;

    #[ORM\Column(length: 5)]
    #[Assert\NotBlank]
    #[Assert\Regex('/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/')]
    #[Groups(['public_calendar_event:read', 'public_calendar_event:write'])]
    private ?string $endTime = null;

    #[ORM\Column(length: 20)]
    #[Assert\NotBlank]
    #[Assert\Choice(['personnel', 'travail', 'autre'])]
    #[Groups(['public_calendar_event:read', 'public_calendar_event:write'])]
    private ?string $category = null;

    #[ORM\Column(length: 20)]
    #[Assert\NotBlank]
    #[Assert\Choice(['en-cours', 'termine', 'a-faire'])]
    #[Groups(['public_calendar_event:read', 'public_calendar_event:write'])]
    private ?string $tag = null;

    #[ORM\Column]
    #[Groups(['public_calendar_event:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    #[Groups(['public_calendar_event:read'])]
    private ?\DateTimeImmutable $updatedAt = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCalendarId(): ?int
    {
        return $this->calendarId;
    }

    public function setCalendarId(int $calendarId): static
    {
        $this->calendarId = $calendarId;
        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;
        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;
        return $this;
    }

    public function getStartTime(): ?string
    {
        return $this->startTime;
    }

    public function setStartTime(string $startTime): static
    {
        $this->startTime = $startTime;
        return $this;
    }

    public function getEndTime(): ?string
    {
        return $this->endTime;
    }

    public function setEndTime(string $endTime): static
    {
        $this->endTime = $endTime;
        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(string $category): static
    {
        $this->category = $category;
        return $this;
    }

    public function getTag(): ?string
    {
        return $this->tag;
    }

    public function setTag(string $tag): static
    {
        $this->tag = $tag;
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }

    #[ORM\PreUpdate]
    public function setUpdatedAtValue(): void
    {
        $this->updatedAt = new \DateTimeImmutable();
    }
}