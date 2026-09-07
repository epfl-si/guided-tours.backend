import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ReqEntraOauthUser } from '../types/auth';

/**
 * Sciper of the authenticated caller, read from the `uniqueid` claim.
 *
 * Only usable on routes protected by AzureAdGuard
 */

export const Sciper = createParamDecorator(
  (_data: unknown, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as ReqEntraOauthUser | undefined;
    const sciper = Number(user?.uniqueid);

    if (!Number.isInteger(sciper)) {
      throw new UnauthorizedException('No sciper on the access token');
    }

    return sciper;
  },
);
