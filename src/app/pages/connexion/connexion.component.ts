import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
declare var M: any;

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit{

  hasAccount: boolean = true;
  hasPassword: boolean = true;
  municipalities: any[] = [];
  client: any = {
    name: '',
    surname: '',
    phone: '',
    municipality: '',
    quarter: '',
    address: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appservice: AppService
  ){}

  ngAfterViewInit(): void {
    // Initialize the modal
    var selectElements = document.querySelectorAll('select');
    var selectInstances = M.FormSelect.init(selectElements);
  }

  ngOnInit(): void {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);
    

    this.appservice.getMunicipalities()
        .subscribe((data) => {
          // console.log(data); 
          this.municipalities = data;
        }
      );
  }

  passwordsMatch() {
    return this.client.password === this.client.confPassword;
  }

  signUp() {
    this.hasAccount = false;
  }

  signIn() {
    this.hasAccount = true;
    this.hasPassword = true;
  }

  forgotPassword() {
    this.hasAccount = true;
    this.hasPassword = false;
  }

  onSubmit() {
    // console.log(this.client)
    this.appservice.signUpClient(this.client)
        .subscribe(event => {
          if (event.type === HttpEventType.Response) {
            // Handle the response from the server
            M.toast({html: 'Compte utilisateur créé avec success....', 
            classes: 'rounded green darken-3', inDuration: 500, outDuration: 575});
            this.onSubmitSignIn();
            // this.router.navigate(['/home']);
          }
        });
  }

  onSubmitSignIn() {
    console.log(this.client.email)
    this.appservice.login(this.client.email, this.client.password)
        .subscribe(response => {
          if(response.status == 200) {
            // this.auth.isLoggedIn = true;
            M.toast({html: 'Connexion réussie', 
            classes: 'rounded green darken-3', inDuration: 500, outDuration: 575});
            this.router.navigate(['/client/dashboard']);
          } else {
            this.client.password = '';
            M.toast({html: 'Paramètres de connexion incorrects', 
            classes: 'rounded red accent-4', inDuration: 500, outDuration: 575});
          }
    });
  }

}
