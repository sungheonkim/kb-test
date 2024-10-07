import { defineStore } from 'pinia';

export const useFaceIdStore = defineStore('faceId', {
  state: () => ({
    isAuthenticated: false,
    userName: ''
  }),
  actions: {
    async authenticate(userName: string) {
      if (this.isAuthenticated) {
        return;
      }
      if (!window.PublicKeyCredential) {
        console.error('Web Authentication API가 지원되지 않습니다.');
        return;
      }
      try {
        const options: object = {
          publicKey: {
            challenge: new Uint8Array(32), // 서버에서 생성된 챌린지를 사용해야 합니다
            rp: {
              name: '어플리케이션이름',
              id: location.hostname
            },
            user: {
              id: new Uint8Array(16), // 사용자 ID를 적절히 설정해야 합니다
              name: userName,
              displayName: userName
            },
            pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
            authenticatorSelection: {
              authenticatorAttachment: 'platform',
              userVerification: 'required'
            },
            timeout: 60000
          }
        };
        const credential = await navigator.credentials.create(options);
        this.isAuthenticated = true;
        this.userName = userName;
        console.log('Credential', credential);
      } catch (error: unknown) {
        this.isAuthenticated = false;
        console.error('Authentication error', error);
      }
    }
  }
});
