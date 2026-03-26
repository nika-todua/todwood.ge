import { Component } from '@angular/core';
import { ContactFormData } from '../../models/contact-form-data';
import { Apiconfig } from '../../apiconfig';

@Component({
  selector: 'app-contactform',
  standalone: false,
  templateUrl: './contactform.html',
  styleUrl: './contactform.scss',
})
export class Contactform {

  constructor(private apiconfig:Apiconfig){}
  
  ContactFormCont:ContactFormData = {
    Full_name: '',
    Email: '',
    Phone_Number: '',
    Project_Type: '',
    Project_Timeline: '',
    Project_Details: '',
  }
  
  ContactFormErrors = {
    Fullname: '',
    Email: '',
    PhoneNumber: '',
    ProjectType: '',
    ProjectDetails: ''
  };


  sendmessage(){
    alert("მალე დაემატება")
    
    return
    // ცვლადები და trim-ები text/textarea ველებისთვის
    const fullname = this.ContactFormCont.Full_name?.trim() || '';
    const email = this.ContactFormCont.Email?.trim() || '';
    const phonenumber = this.ContactFormCont.Phone_Number?.trim() || '';
    const projecttype = this.ContactFormCont.Project_Type;
    const projecttimeline = this.ContactFormCont.Project_Timeline;
    const projectdetails = this.ContactFormCont.Project_Details?.trim() || '';

    // ძველი შეცდომების გასუფთავება
    this.ContactFormErrors = {
      Fullname: '',
      Email: '',
      PhoneNumber: '',
      ProjectType: '',
      ProjectDetails: ''
    };

    // 🔹 ვალიდაცია

    // სახელი და გვარი (უნდა იყოს მხოლოდ ორი სიტყვა)
    if (!fullname) {
      this.ContactFormErrors.Fullname = 'გთხოვთ შეიყვანოთ სახელი და გვარი';
    } else if (fullname.split(/\s+/).length !== 2) {
      this.ContactFormErrors.Fullname = 'შეიყვანეთ მხოლოდ სახელი და გვარი';
    }

    // Email ველი
    const emailPattern = /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,24})+$/;
    if (!email) {
      this.ContactFormErrors.Email = 'გთხოვთ შეიყვანოთ Email';
    } else if (!emailPattern.test(email)) {
      this.ContactFormErrors.Email = 'გთხოვთ შეიყვანოთ სწორი Email მისამართი';
    }

    // PhoneNumber ველი (საერთაშორისო + სიგრძე)
    const phonePattern = /^\+?[0-9]+$/;
    const minLength = 8;
    const maxLength = 15;
    const digitsOnly = phonenumber.replace(/\D/g, '');

    if (!phonenumber) {
      this.ContactFormErrors.PhoneNumber = 'გთხოვთ შეიყვანოთ ტელეფონის ნომერი';
    } else if (!phonePattern.test(phonenumber)) {
      this.ContactFormErrors.PhoneNumber = 'გთხოვთ შეიყვანოთ მხოლოდ ციფრები და შესაძლო + სიმბოლო';
    } else if (digitsOnly.length < minLength || digitsOnly.length > maxLength) {
      this.ContactFormErrors.PhoneNumber = `ტელეფონის ნომერი უნდა იყოს ${minLength}-${maxLength} ციფრი`;
    }

    // ProjectType ველი
    if (!projecttype) {
      this.ContactFormErrors.ProjectType = 'გთხოვთ აირჩიოთ პროექტის ტიპი';
    }

    // ProjectDetails ველი (textarea)
    if (!projectdetails) {
      this.ContactFormErrors.ProjectDetails = 'გთხოვთ შეიყვანოთ პროექტის დეტალები';
    }

    // 🔹 თუ რომელიმე error შეიქმნა, არ გავაგრძელოთ
    if (Object.values(this.ContactFormErrors).some(e => e !== '')) return;

    
    
    // 🔹 აქ გაგრძელდება API call ან სხვა send logic
    console.log('Form is valid, sending message...');
    // this.apiContactsend(this.ContactFormCont)
  }


  apiContactsend(contactform: any) {
    const MAX_PER_DAY = 3;
    const BAN_DAYS = 6;
    const BAN_ON_EXCEED = true;
    const ALERT_TIME = 1500;
    const MS_PER_DAY = 24 * 60 * 60 * 1000;

    const now = Date.now();
    const today = new Date().toISOString().slice(0, 10);

    // 🔔 Alert helper
    const showAlert = (msg: string) => alert(msg);

    // 🔒 BAN CHECK
    const banRaw = localStorage.getItem('stopsendData');
    if (banRaw) {
      try {
        const { time } = JSON.parse(banRaw);
        const endTime = time + BAN_DAYS * MS_PER_DAY;

        if (now < endTime) {
          const remaining = Math.ceil((endTime - now) / MS_PER_DAY);
          showAlert(`🚫 დაბლოკილი ხარ ${remaining} დღე`);
          return;
        }

        localStorage.removeItem('stopsendData');
      } catch {
        localStorage.removeItem('stopsendData');
      }
    }

    // 📊 GET STATS
    let stats = { date: today, count: 0 };
    const statsRaw = localStorage.getItem('sendStats');

    if (statsRaw) {
      try {
        const parsed = JSON.parse(statsRaw);
        if (parsed.date === today && typeof parsed.count === 'number') {
          stats = parsed;
        }
      } catch {}
    }

    // ❌ LIMIT CHECK
    if (stats.count >= MAX_PER_DAY) {
      if (BAN_ON_EXCEED) {
        localStorage.setItem('stopsendData', JSON.stringify({ time: now }));
        showAlert(`⛔ ლიმიტი ამოიწურა — ბანი ${BAN_DAYS} დღე`);
      } else {
        showAlert(`⚠️ დღიური ლიმიტი ამოიწურა`);
      }
      return;
    }

    // 🚀 SEND REQUEST
    this.apiconfig.postContact(contactform).subscribe(
      (response) => {
        // ✅ update stats ONLY on success
        stats.count++;
        localStorage.setItem('sendStats', JSON.stringify(stats));


        console.log('Form submitted successfully:', response);

        contactform = {
          Full_name: '',
          email: '',
          Project_type: '',
          Project_Description: '',
          _date: ''
        };

        showAlert(`✅ გაგზავნილია! დარჩენილი: ${MAX_PER_DAY - stats.count}`);

        setTimeout(() => location.reload(), ALERT_TIME + 200);
      },
      (error) => {
        console.error('Error submitting form:', error);
        showAlert('❌ ფორმის გაგზავნა ვერ მოხერხდა');
      }
    );
  }

  
  
}
