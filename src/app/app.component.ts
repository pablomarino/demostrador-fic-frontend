import { APP_INITIALIZER, Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { bakeEnv } from '@elemental-concept/env-bakery';
import { RestService } from './services/rest.service';
import { Proyecto } from './interfaces/proyecto';
import { HeaderComponent } from "./component/header/header.component";
import { FooterComponent } from "./component/footer/footer.component";
import { LanguageService } from './services/language.service';
//import { BannerComponent } from "./component/banner/banner.component";
//import { LandingComponent } from "./component/pages/landing/landing.component";
//import { ErrorComponent } from './component/pages/error/error.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent], //, BannerComponent, LandingComponent, ErrorComponent
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demostrador-fic';
  idioma: string = 'es';

  data!:Proyecto[];

  constructor(
    private restService: RestService,
    private router:Router,
    private languageService: LanguageService
  ){}

  ngOnInit() {
    this.restService.getProyectos().subscribe(
      (response) => {
        this.data = response
        //console.log(this.data)
      },
      (error) => {
        this.restService.showErrorPage(this.languageService.getLanguage())
        console.error('Error al obtener los datos:', error);
      }
    );
  }
}
