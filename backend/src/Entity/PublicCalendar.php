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
#[ORM\Table(name: 'public_calendars')]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['public_calendar:read']]
        ),
        new Post(
            normalizationContext: ['groups' => ['public_calendar:read']],
            denormalizationContext: ['groups' => ['public_calendar:write']]
        ),
        new Get(
            normalizationContext: ['groups' => ['public_calendar:read']]
        ),
        new Put(
            normalizationContext: ['groups' => ['public_calendar:read']],
            denormalizationContext: ['groups' => ['public_calendar:write']]
        ),
        new Delete(),
    ]
)]
class PublicCalendar
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['public_calendar:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 1, max: 255)]
    #[Groups(['public_calendar:read', 'public_calendar:write'])]
    private ?string $name = null;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups(['public_calendar:read', 'public_calendar:write'])]
    private ?string $description = null;

    #[ORM\Column(length: 7)]
    #[Assert\NotBlank]
    #[Assert\Regex('/^#[0-9A-Fa-f]{6}$/')]
    #[Groups(['public_calendar:read', 'public_calendar:write'])]
    private ?string $color = null;

    #[ORM\Column]
    #[Groups(['public_calendar:read', 'public_calendar:write'])]
    private ?int $ownerId = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['public_calendar:read', 'public_calendar:write'])]
    private ?string $ownerName = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Email]
    #[Groups(['public_calendar:read', 'public_calendar:write'])]
    private ?string $ownerEmail = null;

    #[ORM\Column]
    #[Groups(['public_calendar:read', 'public_calendar:write'])]
    private bool $isActive = true;

    #[ORM\Column]
    #[Groups(['public_calendar:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    #[Groups(['public_calendar:read'])]
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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;
        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): static
    {
        $this->color = $color;
        return $this;
    }

    public function getOwnerId(): ?int
    {
        return $this->ownerId;
    }

    public function setOwnerId(int $ownerId): static
    {
        $this->ownerId = $ownerId;
        return $this;
    }

    public function getOwnerName(): ?string
    {
        return $this->ownerName;
    }

    public function setOwnerName(string $ownerName): static
    {
        $this->ownerName = $ownerName;
        return $this;
    }

    public function getOwnerEmail(): ?string
    {
        return $this->ownerEmail;
    }

    public function setOwnerEmail(string $ownerEmail): static
    {
        $this->ownerEmail = $ownerEmail;
        return $this;
    }

    public function isActive(): bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): static
    {
        $this->isActive = $isActive;
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