import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { ReservationGuideStatus } from '../../../generated/prisma/client';

/**
 * The two answers a guide can give. `WAITING` is the initial state and `CHOSEN`
 * is set by an admin, so neither is accepted here.
 */
export const GUIDE_ANSWERS = ['ACCEPTED', 'DECLINED'] as const;

export type GuideAnswer = (typeof GUIDE_ANSWERS)[number];

export class RespondInvitationDto {
  @ApiProperty({ enum: GUIDE_ANSWERS })
  @IsIn(GUIDE_ANSWERS)
  status!: GuideAnswer;
}

class InvitationLanguageDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;
}

class InvitationPlaceDto {
  @ApiProperty()
  id!: number;

  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'string' },
    description: 'Title keyed by language code',
  })
  title!: Record<string, string>;
}

class InvitationReservationDto {
  @ApiProperty()
  date!: Date;

  @ApiProperty()
  participantNumber!: number;

  @ApiProperty({ nullable: true })
  comment!: string | null;

  @ApiProperty({ type: InvitationLanguageDto })
  language!: InvitationLanguageDto;

  @ApiProperty({ type: InvitationPlaceDto })
  place!: InvitationPlaceDto;
}

export class GuideInvitationDto {
  @ApiProperty()
  reservationId!: number;

  @ApiProperty({ enum: ReservationGuideStatus })
  status!: ReservationGuideStatus;

  @ApiProperty({ type: InvitationReservationDto })
  reservation!: InvitationReservationDto;
}
