import React from "react";
import PropTypes from "prop-types";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ButtonGroup
} from "reactstrap";
import { confirmable, createConfirmation } from "react-confirm";

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }
  toggle = () => {
    this.setState({
      open: !this.state.open
    });
  };
  render() {
    const { title, okLabel, cancelLabel, confirmation, proceed } = this.props;
    return (
      <Modal isOpen={this.state.open} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
        <ModalBody className="py-4">
          <div>{confirmation}</div>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button onClick={this.toggle} color="secondary">
              {cancelLabel}
            </Button>
            <Button onClick={() => proceed(true)} color="bpm">
              {okLabel}
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    );
  }
}

Confirmation.propTypes = {
  okLabbel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  proceed: PropTypes.func // called when ok button is clicked.
};

export function confirm(
  confirmation,
  title = "درخواست تایید",
  okLabel = "تایید",
  cancelLabel = "بستن",
  options = {}
) {
  return createConfirmation(
    confirmable(Confirmation),
    0
  )({
    confirmation,
    title,
    okLabel,
    cancelLabel,
    ...options
  });
}
