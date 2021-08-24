import { jsPDF } from "jspdf";

export function render(info) {
    console.log(info);
    const doc = new jsPDF();
    doc.text("Formulaire de contact", 10, 10);

    if (info.person.type === 'person') {
        doc.text("Personne physique", 10, 20);
        doc.text('Nom: ' + info.person.firstname + ' ' + info.person.lastname, 10, 30);
        doc.text('E-mail: ' + info.person.email, 10, 40);
        doc.text('Date de naissance: ' + info.person.dateOfBirth, 10, 50);
    } else if (info.person.type === 'company') {
        doc.text("Personne morale", 10, 20);
        doc.text("Dénomination sociale: " + info.person.companyId, 10, 30);
    }

    doc.save(`Formulaire Contact.pdf`);
}
