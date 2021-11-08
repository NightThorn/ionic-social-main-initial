import {HttpClient, HttpHeaders} from '@angular/common/http';


 class User {
  constructor(

    public user_id: number,
    public user_name: string,
    public user_picture: string,
    public user_cover: string
  ){}
  }
  export class ProfileService {

    endpoint = 'https://ggs.tv/api/v1/profile.php?user_id=${userId}';
  profile = [];
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private httpClient: HttpClient) { }
  
    fetchProfile(user_id: string) {
      const promise = new Promise<void>((resolve, reject) => {
        this.httpClient
          .get<User[]>(`https://ggs.tv/api/v1/profile.php?user_id=${user_id}`)
          .toPromise()
          .then((res: any) => {
            this.profile = res.map((res: any) => {
              return new User(
                res.user_id,
                res.user_name,
                res.user_picture,
                res.user_cover
                
              );
            });
            resolve();
          },
            err => {
              reject(err);
            }
          );
      });
      return promise;
    }
         
      
  
    
    
  }