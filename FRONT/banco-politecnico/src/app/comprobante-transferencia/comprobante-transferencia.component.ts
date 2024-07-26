import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UsuarioDataTransferenciaService } from '../services/usuario-data-transferencia.service';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../services/backend.service'; // Importa el servicio del backend
import { AccountService } from '../services/account.service'; // Importa el servicio de cuenta
import { Observable } from 'rxjs';


@Component({
  selector: 'app-comprobante-transferencia',
  templateUrl: './comprobante-transferencia.component.html',
  styleUrls: ['./comprobante-transferencia.component.css']
})
export class ComprobanteTransferenciaComponent implements OnInit {
  cuentaNombre: string = '';
  numeroCuenta: string = '';
  tipoCuenta: string = '';
  saldo: number = 0;
  amount: number = 0;
  usuario: string = '';
  numeroIdentidad: string = '';
  contactName: string = '';
  contactNumber: string = '';
  comment: string = '';
  comprobante: string = '';
  costoTransaccion: number = 0;
  fecha: Date = new Date();
  //SE AGREGO
  nombrePropietario: string | undefined; // Nueva variable para el nombre completo del propietario de la cuenta


  email: string = '';
  phoneNumber: string = '';
  private apiUrl = 'https://bancopolitecnico-backend.vercel.app';



  beneficiary = {
    name: '',
    number: ''
  };
  cuentaOrigen = {
    nombre: '',
    numeroCuenta: ''
  };

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private cdr: ChangeDetectorRef,
    private usuarioDataTransferenciaService: UsuarioDataTransferenciaService,
    private http: HttpClient,
    private backendService: BackendService, // Inyecta el servicio del backend
    private accountService: AccountService // Inyecta el servicio de cuenta

  ) {}

  //SMS Y CORREO
  //SE MODIFICO
  /*
  
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.cuentaNombre = params['cuentaNombre'] || '';
      this.numeroCuenta = params['numeroCuenta'] || '';
      this.tipoCuenta = params['tipoCuenta'] || '';
      this.saldo = +params['saldo'] || 0;
      this.amount = +params['amount'] || 0;
      this.usuario = params['usuario'] || '';
      this.numeroIdentidad = params['numeroIdentidad'] || '';
      this.contactName = params['contactName'] || '';
      this.contactNumber = params['contactNumber'] || '';
      this.comment = params['comment'] || '';

      this.beneficiary.name = this.contactName;
      this.beneficiary.number = this.contactNumber;
      //this.cuentaOrigen.nombre = this.cuentaNombre;
      this.cuentaOrigen.numeroCuenta = this.numeroCuenta;

      //this.comprobante = this.generateUniqueComprobante();
      this.comprobante = params['numero_comprobante_transferencia'];
      this.cdr.detectChanges(); // Forzar la detección de cambios

      // Obtener los datos del usuario desde el servicio compartido
      const usuarioData = this.usuarioDataTransferenciaService.getUsuarioData();
      this.email = usuarioData.correo_electronico;
      this.phoneNumber = usuarioData.numero_telefono;

      // Enviar confirmación por correo electrónico y SMS
      if (this.email && this.phoneNumber) {
        this.enviarConfirmacion(this.email, this.phoneNumber, this.amount, this.contactName, this.numeroCuenta);
      } else {
        console.error('Datos del usuario incompletos');
      }

      //SE AGREGO
      // Obtener el nombre completo del propietario de la cuenta
      this.obtenerNombrePropietario(this.usuario);
    });
  }

  enviarConfirmacion(email: string, phoneNumber: string, amount: number, contactName: string, numeroCuenta: string): void {
    const subject = 'Confirmación de Transferencia - Banco Politécnico';
    const message = `Transferencia exitosa. Se ha transferido $${amount} a ${contactName} desde su cuenta ${numeroCuenta}.`;
    const payload = { email, phoneNumber, subject, message };
    console.log('Payload enviado:', payload); // Log para verificar el payload
    
    // Enviar confirmación por correo electrónico y SMS
    this.http.post(`${this.apiUrl}/send-confirmation`, payload).subscribe(
      (confirmResponse: any) => {
        console.log('Confirmación enviada:', confirmResponse);
      },
      (confirmError: any) => {
        console.error('Error al enviar confirmación:', confirmError);
      }
    );
  }
  */

  //SOLO CORREO
  //SE MODIFICO
  /*ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cuentaNombre = params['cuentaNombre'] || '';
      this.numeroCuenta = params['numeroCuenta'] || '';
      this.tipoCuenta = params['tipoCuenta'] || '';
      this.saldo = +params['saldo'] || 0;
      this.amount = +params['amount'] || 0;
      this.usuario = params['usuario'] || '';
      this.numeroIdentidad = params['numeroIdentidad'] || '';
      this.contactName = params['contactName'] || '';
      this.contactNumber = params['contactNumber'] || '';
      this.comment = params['comment'] || '';

      this.beneficiary.name = this.contactName;
      this.beneficiary.number = this.contactNumber;
      this.cuentaOrigen.nombre = '';
      this.cuentaOrigen.numeroCuenta = this.numeroCuenta;

      //this.comprobante = this.generateUniqueComprobante();
      this.comprobante = params['numero_comprobante_transferencia'];
      this.cdr.detectChanges(); // Forzar la detección de cambios

      // Obtener los datos del usuario desde el servicio compartido
      const usuarioData = this.usuarioDataTransferenciaService.getUsuarioData();
      this.email = usuarioData.correo_electronico;
      this.phoneNumber = usuarioData.numero_telefono;

      // Enviar confirmación por correo electrónico y SMS
      if (this.email && this.phoneNumber) {
        this.enviarConfirmacion(this.email, this.amount, this.contactName, this.numeroCuenta);
      } else {
        console.error('Datos del usuario incompletos');
      }
      //SE AGREGO
      // Obtener el nombre completo del propietario de la cuenta
      //this.obtenerNombrePropietario(this.usuario);

      

      //this.comprobante = this.generateUniqueComprobante();
      //this.cdr.detectChanges(); // Forzar la detección de cambios

      //SE AGREGO
      // Generar y subir automáticamente los comprobantes PDF y PNG
      this.generateAndUploadComprobante();

      
     
    });
  }*/

    ngOnInit(): void {
      this.route.queryParams.subscribe(async params => {
        this.cuentaNombre = params['cuentaNombre'] || '';
        this.numeroCuenta = params['numeroCuenta'] || '';
        this.tipoCuenta = params['tipoCuenta'] || '';
        this.saldo = +params['saldo'] || 0;
        this.amount = +params['amount'] || 0;
        this.usuario = params['usuario'] || '';
        this.numeroIdentidad = params['numeroIdentidad'] || '';
        this.contactName = params['contactName'] || '';
        this.contactNumber = params['contactNumber'] || '';
        this.comment = params['comment'] || '';
    
        this.beneficiary.name = this.contactName;
        this.beneficiary.number = this.contactNumber;
        this.cuentaOrigen.nombre = await this.obtenerNombreDeEmisor();
        this.cuentaOrigen.numeroCuenta = this.numeroCuenta;
    
        this.comprobante = params['numero_comprobante_transferencia'];
        this.cdr.detectChanges(); // Forzar la detección de cambios
    
        const usuarioData = this.usuarioDataTransferenciaService.getUsuarioData();
        this.email = usuarioData.correo_electronico;
        this.phoneNumber = usuarioData.numero_telefono;
    
        if (this.email && this.phoneNumber) {
          this.enviarConfirmacion(this.email, this.amount, this.contactName, this.numeroCuenta);
          //this.enviarConfirmacion(this.email, this.amount, this.contactName, this.numeroCuenta);
        } else {
          console.error('Datos del usuario incompletos');
        }
    
        try {
          // Obtener y asignar el nombre del propietario de la cuenta
          
          console.log('Nombre del propietario de la cuenta:', this.cuentaOrigen.nombre);
        } catch (error) {
          console.error('Error al obtener el nombre del propietario:', error);
        }
    
        this.generateAndUploadComprobante();
      });
    }
    

  obtenerNombreDeEmisor(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.accountService.getNombreCompleto(this.usuario).subscribe(
        (data: any) => {
          if (data && data.nombre_completo) {
            resolve(data.nombre_completo);
          } else {
            reject('No se encontró la información del propietario de la cuenta.');
          }
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }
  


  enviarConfirmacion(email: string, amount: number, contactName: string, numeroCuenta: string): void {
    const subject = 'Confirmación de Transferencia - Banco Politécnico';
    const message = `Transferencia exitosa. Se ha transferido $${amount} a ${contactName} desde su cuenta ${numeroCuenta}.`;
    const payload = { email, subject, message };
    console.log('Payload enviado:', payload); // Log para verificar el payload
    
    // Enviar confirmación por correo electrónico y SMS
    this.http.post(`${this.apiUrl}/send-confirmation`, payload).subscribe(
      (confirmResponse: any) => {
        console.log('Confirmación enviada:', confirmResponse);
      },
      (confirmError: any) => {
        console.error('Error al enviar confirmación:', confirmError);
      }
    );
  }

  

  //SE AGREGO
  obtenerNombrePropietario(usuario: string): void {
    this.accountService.getNombreCompleto(usuario).subscribe(
      data => {
        if (data && data.nombre_completo) {
          this.nombrePropietario = data.nombre_completo;
          console.log('Nombre del Propietario: ', this.nombrePropietario);
          this.cuentaOrigen.nombre = this.nombrePropietario || ''; // Asigna el nombre del propietario a cuentaOrigen.nombre, asegurando que no sea undefined
          this.cdr.detectChanges(); // Forzar la detección de cambios
        } else {
          console.log('No se encontró la información del propietario de la cuenta.');
        }
      },
      error => {
        console.error('Error al obtener la información del propietario de la cuenta:', error);
      }
    );
  }

 

  //SE AGREGO
  // En el método downloadPDF y downloadPNG
  generateAndUploadComprobante() {
    const data = document.getElementById('receipt');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 208;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let position = 0;
  
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        const pdfOutput = pdf.output('datauristring'); // Convertir PDF a base64
  
        const pdfBase64 = pdfOutput.split(',')[1]; // Extraer solo la parte base64
        const pngBase64 = imgData.split(',')[1];   // Extraer solo la parte base64
  
        // Enviar comprobante al backend
        this.backendService.uploadComprobante(this.comprobante, pdfBase64, pngBase64).subscribe(
          (response: any) => {
            console.log('Comprobante guardado exitosamente en la base de datos:', response);
          },
          (error: any) => {
            console.error('Error al guardar el comprobante en la base de datos:', error);
          }
        );
      });
    }
  }

  downloadPDF() {
    const data = document.getElementById('receipt');
    if (data) {
      html2canvas(data, { backgroundColor: '#ffffff' }).then(canvas => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save(`${this.comprobante}.pdf`);
      });
    }
  }

  downloadPNG() {
    const data = document.getElementById('receipt');
    if (data) {
      html2canvas(data, { backgroundColor: '#ffffff' }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `${this.comprobante}.png`;
        link.click();
      });
    }
  }

  dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  /*
  downloadPDF() {
    const data = document.getElementById('receipt');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('comprobante.pdf');
      });
    }
  }

  downloadPNG() {
    const data = document.getElementById('receipt');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'comprobante.png';
        link.click();
      });
    }
  }
  */

  //NUEVOS METODOS PARA DESCARGAR COMO PDF Y PNG LOS COMPROBANTES

  /*
  downloadPDF() {
    const data = document.getElementById('receipt');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        const pdfOutput = pdf.output('blob');

        const formData = new FormData();
        formData.append('comprobante', pdfOutput, `${this.comprobante}.pdf`);

        this.backendService.uploadComprobante(formData).subscribe(
          (response: any) => {
            console.log('PDF uploaded successfully:', response);
            pdf.save(`${this.comprobante}.pdf`);
          },
          (error: any) => {
            console.error('Error uploading PDF:', error);
          }
        );
      });
    }
  }

  downloadPNG() {
    const data = document.getElementById('receipt');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        const formData = new FormData();
        formData.append('comprobante', this.dataURItoBlob(imgData), `${this.comprobante}.png`);

        this.backendService.uploadComprobante(formData).subscribe(
          (response: any) => {
            console.log('PNG uploaded successfully:', response);
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `${this.comprobante}.png`;
            link.click();
          },
          (error: any) => {
            console.error('Error uploading PNG:', error);
          }
        );
      });
    }
  }
    */

  /*
  dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
  */
  
  //NUEVOS METODOS PARA DESCARGAR COMO PDF Y PNG LOS COMPROBANTES

  goToHome() {
    this.router.navigate(['/inicio'], {
      queryParams: {
        numeroIdentidad: this.numeroIdentidad,
        usuario: this.usuario
      }
    });
  }
}
