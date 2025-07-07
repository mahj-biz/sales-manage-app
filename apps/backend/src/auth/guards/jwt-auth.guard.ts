import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// This guard leverages the 'jwt' strategy we just defined.
// We can use it to protect our endpoints.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}