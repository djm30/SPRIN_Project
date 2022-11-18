import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import PageNumbers from "../../UI/PageNumbers";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const PdfPage = ({ resource }) => {
    const [currPage, setCurrPage] = useState(1);
    const [numPages, setNumPages] = useState(0);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center h-fit">
                <Document
                    className="mt-12 border-4 border-darkblue-100 rounded-lg mb-5"
                    file={resource.resourceUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={currPage} renderAnnotationLayer={false} />
                </Document>

                <div>
                    <PageNumbers
                        setCurrPage={setCurrPage}
                        numPages={numPages}
                        currPage={currPage}
                    />
                </div>
                {/* INFORMATION AND DOWNLOAD */}
            </div>
        </div>
    );
};

export default PdfPage;
