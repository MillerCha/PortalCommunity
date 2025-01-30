using AuthService.Model;

namespace AuthService.Interfaces
{
    public interface IAuthenticationService
    {
        string Auth(Credential credential);
    }
}
