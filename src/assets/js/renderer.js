import { jsPDF } from "jspdf";


(function(API){
    API.textCenter = function(text, options, x, y) {
        options = options || {};
        if(options.align === 'center'){
            let fontSize = this.internal.getFontSize();
            let pageWidth = this.internal.pageSize.width;
            const txtWidth = this.getStringUnitWidth(text)*fontSize/this.internal.scaleFactor;
            x = ( pageWidth - txtWidth ) / 2;
        }
        this.text(text, x, y);
    }
})(jsPDF.API);

(function(API){
    API.leftMargin = function(level) {
        return 10 + level * 8;
    }
})(jsPDF.API);

(function(API){
    API.nextLine = function(y) {
        let fontSize = this.internal.getFontSize();
        let heightFactor = this.internal.getLineHeightFactor();
        console.log(fontSize);
        console.log(heightFactor);
        return y + (fontSize * heightFactor / this.internal.scaleFactor);
    }
})(jsPDF.API);


export function render(info) {
    console.log(info);
    const doc = new jsPDF('portrait', 'mm');
    doc.setFont("helvetica");
    doc.setFontSize(22);
    doc.textCenter("Formulaire de contact", {align: "center"}, 0, 10);

    let x = doc.leftMargin(0);
    let y = 30;

    doc.setFontSize(12);
    if (info.customer.type === 'person') {
        doc.text('Personne physique', x, y);
        y = doc.nextLine(y);

        info.customer.identities.forEach(function(identity) {
            doc.text(`${identity.title} ${identity.firstname} ${identity.lastname}`, x, y);
            y = doc.nextLine(y);
            doc.text('\u2022 Date de naissance: ' + identity.dateOfBirth, x, y);
        });
    } else if (info.customer.type === 'company') {
        doc.text("Personne morale", x, y);
        y = doc.nextLine(y);
        doc.text("\u2022 Dénomination sociale: " + info.customer.companyId, x, y);
    }

    doc.addPage();

    doc.save(`Formulaire Contact.pdf`);
}
