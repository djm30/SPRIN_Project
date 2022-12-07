import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import LoadingSpinner from "../../UI/LoadingSpinner";
import PageNumbers from "../../UI/PageNumbers";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const PdfPage = ({ resource }) => {
    const [currPage, setCurrPage] = useState(1);
    const [numPages, setNumPages] = useState(0);
    const [loading, setLoading] = useState(true);

    function onDocumentLoadSuccess({ numPages }) {
        setLoading(false);
        setNumPages(numPages);
    }

    return (
        <div>
            <div>
                <div className="flex justify-center items-center bg-neutral-50 rounded-xl p-4 my-4 min-h-[500px]">
                    <Document
                        className=""
                        file={resource.resourceUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={<LoadingSpinner />}
                    >
                        <Page
                            pageNumber={currPage}
                            renderAnnotationLayer={false}
                            loading={<LoadingSpinner />}
                        />
                    </Document>
                </div>

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
