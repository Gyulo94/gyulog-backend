import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

Entity();
export class CommonEntity {
  @CreateDateColumn()
  // @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  // @Exclude()
  updatedAt: Date;

  @VersionColumn()
  // @Exclude()
  version: number;
}
