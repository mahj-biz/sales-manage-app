import { Controller, Post, Body, Res, Get, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return { message: 'Registration successful', user };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      // Use a generic message to prevent user enumeration attacks
      return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }
    
    const { access_token } = await this.authService.login(user);

    response.cookie('access_token', access_token, {
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      secure: this.configService.get('NODE_ENV') === 'production', // Use secure cookies in production
      sameSite: 'strict', // Helps prevent CSRF
      maxAge: 3600000, // 1 hour
    });
    
    return { message: 'Login successful', user };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    return { message: 'Successfully logged out' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    // req.user is populated by the JwtStrategy's validate() method
    return req.user;
  }
}