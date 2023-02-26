import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity()
export class MusicEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  coverAlbum: string;

  @Column()
  artistName: string;

  @ManyToOne((type) => UserEntity, (user) => user.id) user: UserEntity;
}
