export interface UserRegister {
    name: string | null;
    userName: string | null;
    email: string | null;
    phoneNumber: string | null;
    password: string | null;
    confirmPassword: string | null;
    acceptTerms: boolean | null;
}