export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string | Date;
  position?: string;
  jerseyNumber?: number;
  nationality?: string;
  height?: number;
  weight?: number;
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export type PlayerFormData = Omit<Player, 'id' | 'createdAt' | 'updatedAt'>;

export interface PlayerFormProps {
  onSubmit: (playerData: PlayerFormData) => void;
  initialData?: Player | null;
  onCancel: () => void;
}

// Add PlayerCardProps interface
export interface PlayerCardProps {
  player: Player;
  onEdit: (player: Player) => void;
  onDelete: (playerId: string) => void;
}