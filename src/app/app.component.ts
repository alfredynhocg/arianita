import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InvitadosService, Invitado } from './invitados.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [InvitadosService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AppComponent implements AfterViewInit {
  title = 'Invitación Bautizo - Arianita';
  
  nombreNina = 'Arianita';
  nombreMadre = 'María Elena Choque Núñez';
  fechaBautizo = '24 de enero de 2026';
  
  imagenes = [
    'assets/imagenes/1.jpeg',
    'assets/imagenes/2.jpeg',
    'assets/imagenes/3.jpeg'
  ];
  indiceActual = 0;
  intervaloSlider: any;
  
  nombreInvitado = '';
  confirmado = false;
  mostrarFormulario = false;
  cargando = false;
  
  invitadosConfirmados: Invitado[] = [];
  mostrarListaInvitados = false;
  totalInvitados = 0;
  
  passwordAdmin = '';
  autenticado = false;
  mostrarLoginAdmin = false;
  errorMessage = '';
  
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  musicPlaying = true;
  
  sobreAbierto = false;
  
  // PWA Install
  deferredPrompt: any;
  mostrarBotonInstalar = false;

  constructor(private invitadosService: InvitadosService) {
    this.cargarContador();
    this.iniciarSlider();
  }

  ngOnInit() {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
      easing: 'ease-in-out'
    });
    
    // Capturar el evento de instalación PWA
    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.mostrarBotonInstalar = true;
    });
    
    // Verificar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.mostrarBotonInstalar = false;
    }
  }
  
  abrirSobre() {
    this.sobreAbierto = true;
    this.intentarReproducirMusica();
    // Refrescar AOS después de mostrar el contenido
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }
  
  instalarApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuario aceptó instalar la app');
        }
        this.deferredPrompt = null;
        this.mostrarBotonInstalar = false;
      });
    }
  }

  cargarContador() {
    this.invitadosService.getCount().subscribe({
      next: (response) => {
        this.totalInvitados = response.count || 0;
      },
      error: (error) => {
        console.error('Error al cargar contador:', error);
      }
    });
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.confirmado = false;
    this.errorMessage = '';
  }

  toggleListaInvitados() {
    if (!this.autenticado) {
      this.mostrarLoginAdmin = !this.mostrarLoginAdmin;
      this.errorMessage = '';
    } else {
      this.mostrarListaInvitados = !this.mostrarListaInvitados;
    }
  }

  confirmarAsistencia() {
    if (this.nombreInvitado.trim()) {
      this.cargando = true;
      this.errorMessage = '';

      this.invitadosService.confirmarAsistencia(this.nombreInvitado.trim()).subscribe({
        next: (response) => {
          this.cargando = false;
          if (response.success) {
            this.confirmado = true;
            this.totalInvitados++;
            alert(`¡Gracias ${this.nombreInvitado}! Hemos registrado tu confirmación. ¡Te esperamos! 💖`);
            this.nombreInvitado = '';
          } else {
            this.errorMessage = response.message || 'Error al confirmar';
          }
        },
        error: (error) => {
          this.cargando = false;
          this.errorMessage = 'Error de conexión. Por favor intenta nuevamente.';
          console.error('Error:', error);
        }
      });
    }
  }

  loginAdmin() {
    if (this.passwordAdmin.trim()) {
      this.cargando = true;
      this.errorMessage = '';

      this.invitadosService.getInvitados(this.passwordAdmin).subscribe({
        next: (response) => {
          this.cargando = false;
          if (response.success && response.invitados) {
            this.autenticado = true;
            this.invitadosConfirmados = response.invitados;
            this.mostrarLoginAdmin = false;
            this.mostrarListaInvitados = true;
            this.errorMessage = '';
          } else {
            this.errorMessage = 'Contraseña incorrecta';
            this.passwordAdmin = '';
          }
        },
        error: (error) => {
          this.cargando = false;
          this.errorMessage = error.error?.message || 'Error de conexión';
          this.passwordAdmin = '';
          console.error('Error:', error);
        }
      });
    }
  }

  cerrarSesionAdmin() {
    this.autenticado = false;
    this.passwordAdmin = '';
    this.mostrarListaInvitados = false;
    this.invitadosConfirmados = [];
  }

  recargarLista() {
    if (this.autenticado && this.passwordAdmin) {
      this.cargando = true;
      this.invitadosService.getInvitados(this.passwordAdmin).subscribe({
        next: (response) => {
          this.cargando = false;
          if (response.success && response.invitados) {
            this.invitadosConfirmados = response.invitados;
            this.totalInvitados = response.invitados.length;
          }
        },
        error: (error) => {
          this.cargando = false;
          console.error('Error al recargar:', error);
        }
      });
    }
  }

  eliminarInvitado(id: number) {
    if (confirm('¿Estás seguro de eliminar este invitado?')) {
      this.cargando = true;
      this.invitadosService.eliminarInvitado(id, this.passwordAdmin).subscribe({
        next: (response) => {
          this.cargando = false;
          if (response.success) {
            this.recargarLista();
          } else {
            alert('Error al eliminar: ' + response.message);
          }
        },
        error: (error) => {
          this.cargando = false;
          alert('Error de conexión al eliminar');
          console.error('Error:', error);
        }
      });
    }
  }

  descargarLista() {
    const texto = this.invitadosConfirmados
      .map((inv, i) => `${i + 1}. ${inv.nombre} - Confirmado: ${inv.fechaLegible}`)
      .join('\n');
    
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invitados-bautizo-arianita.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  limpiarTodo() {
    if (confirm('¿Estás seguro de eliminar TODOS los invitados? Esta acción no se puede deshacer.')) {
      this.cargando = true;
      this.invitadosService.limpiarTodos(this.passwordAdmin).subscribe({
        next: (response) => {
          this.cargando = false;
          if (response.success) {
            this.invitadosConfirmados = [];
            this.totalInvitados = 0;
            alert('Lista limpiada exitosamente');
          } else {
            alert('Error al limpiar: ' + response.message);
          }
        },
        error: (error) => {
          this.cargando = false;
          alert('Error de conexión al limpiar');
          console.error('Error:', error);
        }
      });
    }
  }

  iniciarSlider() {
    this.intervaloSlider = setInterval(() => {
      this.siguiente();
    }, 4000); // Cambia cada 4 segundos
  }

  siguiente() {
    this.indiceActual = (this.indiceActual + 1) % this.imagenes.length;
  }

  anterior() {
    this.indiceActual = (this.indiceActual - 1 + this.imagenes.length) % this.imagenes.length;
  }

  irASlide(indice: number) {
    this.indiceActual = indice;
    clearInterval(this.intervaloSlider);
    this.iniciarSlider();
  }

  ngOnDestroy() {
    if (this.intervaloSlider) {
      clearInterval(this.intervaloSlider);
    }
  }

  ngAfterViewInit() {
    this.intentarReproducirMusica();
  }

  intentarReproducirMusica() {
    setTimeout(() => {
      if (this.audioPlayer) {
        const audio = this.audioPlayer.nativeElement;
        audio.volume = 0.7; // Volumen al 70%
        audio.play().then(() => {
          this.musicPlaying = true;
          console.log('Música reproduciéndose');
        }).catch(error => {
          console.log('Autoplay bloqueado, espera interacción del usuario');
          this.musicPlaying = false;
        });
      }
    }, 300);
  }

  toggleMusic() {
    if (!this.audioPlayer) return;
    
    const audio = this.audioPlayer.nativeElement;
    
    if (this.musicPlaying) {
      audio.pause();
      this.musicPlaying = false;
    } else {
      audio.play().catch(error => {
        console.error('Error al reproducir música:', error);
      });
      this.musicPlaying = true;
    }
  }
}
