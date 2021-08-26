import { jsPDF } from "jspdf";

export function render(info) {
    console.log(info);
    const doc = new jsPDF();
    doc.text("Formulaire de contact", 10, 10);

    if (info.seller.type === 'person') {
        doc.text("Personne physique", 10, 20);
        doc.text('Nom: ' + info.seller.firstname + ' ' + info.seller.lastname, 10, 30);
        doc.text('E-mail: ' + info.seller.email, 10, 40);
        doc.text('Date de naissance: ' + info.seller.dateOfBirth, 10, 50);
    } else if (info.seller.type === 'company') {
        doc.text("Personne morale", 10, 20);
        doc.text("Dénomination sociale: " + info.seller.companyId, 10, 30);
    }

    doc.save(`Formulaire Contact.pdf`);
}
