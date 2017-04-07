import { BootScript } from '@mean-expert/boot-script';

@BootScript()
class Authentication {
  constructor(app: any) {
    app.enableAuth();
    app.models.RoleMapping.settings.strictObjectIDCoercion = true;
  }
}

module.exports = Authentication;
