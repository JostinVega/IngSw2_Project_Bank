import { Component } from '@angular/core';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  amount: string = '';
  previousValidAmount: string = '';

  onAmountChange(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    const decimalCount = (input.split('.')[1] || '').length;
    const value = parseFloat(input);

    if (/^\d*\.?\d{0,2}$/.test(input) && (value <= 15000 || input === '')) {
      this.amount = input;
    } else {
      if (value > 15000) {
        alert('El valor máximo a transferir es 15000.00');
      }
      (event.target as HTMLInputElement).value = this.amount;
    }
  }

  formatAmount(): void {
    let value = parseFloat(this.amount);
    if (isNaN(value) || value < 1 || value > 15000) {
      if (value > 15000) {
        alert('El valor máximo a transferir es 15000.00');
      }
      this.amount = this.previousValidAmount;
    } else {
      this.amount = value.toFixed(2);
      this.previousValidAmount = this.amount;
    }

    // Asegurar que siempre se muestren dos decimales
    if (this.amount.indexOf('.') !== -1) {
      const parts = this.amount.split('.');
      if (parts[1].length === 1) {
        this.amount = `${parts[0]}.${parts[1]}0`;
        
      }
    }
  }

  goBack(): void {
    // Implementar la lógica para volver a la página anterior
    console.log('Volver a la página anterior');
  }

  chooseBeneficiary(): void {
    // Implementar la lógica para elegir el beneficiario
    console.log('Elegir el beneficiario');
    
  }
}
