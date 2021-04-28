const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const open = require("open");
import * as fs from "fs"
import * as path from "path"
import { User } from "../app/src/models/User"

export async function convert(json: User) {
    //Load the docx file as a binary
    var content = fs
        .readFileSync(path.resolve(__dirname, "test_data", 'report.docx'), 'binary');

    var zip = new PizZip(content);
    var doc;
    try {
        doc = new Docxtemplater(zip);
    } catch (error) {
        // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
        // errorHandler(error);
        console.error(error);

    }

    //set the templateVariables
    doc.setData(json);

    try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render()
    }
    catch (error) {
        // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
        console.error(error);

        // errorHandler(error);
    }

    var buf = doc.getZip()
        .generate({ type: 'nodebuffer' });

    // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    const outputFilePath = path.resolve(__dirname, 'output.docx')
    fs.writeFileSync(outputFilePath, buf);
    open(outputFilePath)
}

if (require.main === module) {
    const j: any = JSON.parse(fs.readFileSync("test_data/setting.json").toString());
    console.log(j);

    convert(j)
}