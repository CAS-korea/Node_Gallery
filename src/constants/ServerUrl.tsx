export enum ServerUrl {
    Local = 'http://localhost:8080',
    Production = 'https://api.example.com',
}

// 배포 시 ApiHandler.tsx에서
// baseURL: ServerUrl.Local을
// baseURL: ServerUrl.Production으로 수정하기!