import React, {useEffect} from "react";

// reactstrap components
import {Button, Modal, ModalBody, ModalFooter} from "reactstrap";

function ModalCritico(props: {rolled: number}) {
    const [modalOpen, setModalOpen] = React.useState(false);

    useEffect(() => {
        if (props.rolled === 20) {
            setModalOpen(true);
        }
    }, []);
    return (
        <>
            <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
                <div className=" modal-header">
                    <h5 className=" modal-title" id="exampleModalLabel">
                        Modal title
                    </h5>
                    <button
                        aria-label="Close"
                        className=" close"
                        type="button"
                        onClick={() => setModalOpen(!modalOpen)}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <ModalBody>...</ModalBody>
                <ModalFooter>
                    <Button
                        color="secondary"
                        type="button"
                        onClick={() => setModalOpen(!modalOpen)}
                    >
                        Close
                    </Button>
                    <Button color="primary" type="button">
                        Save changes
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ModalCritico;
