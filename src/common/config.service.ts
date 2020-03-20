import * as envalid from 'envalid';
const { str, port } = envalid;

export class ConfigService {
    private readonly envConfig: Record<string, string>;

    constructor() {
        this.envConfig = envalid.cleanEnv(process.env, {
            APP_PORT: port({ default: 3000 }),
            DATABASE: str(),
            DATABASE_USERNAME: str(),
            DATABASE_PASSWORD: str()
        });
    }

    public get(key: string): string {
        return this.envConfig[key];
    }
}