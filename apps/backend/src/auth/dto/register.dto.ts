import { CreateUserDto } from '../../users/dto/create-user.dto';

// RegisterDto can be an alias or extend CreateUserDto if you add more fields later
export class RegisterDto extends CreateUserDto {}