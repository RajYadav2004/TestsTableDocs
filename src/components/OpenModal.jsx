import React, { useState } from 'react'
import { Button, Modal } from "antd";

function OpenModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


  return (
    <>
      <Button
      type='primary'
      onClick={showModal}
      >
        Open Modal
      </Button>
      <Modal 
      title="Test Information"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      >
        <h1>Test1</h1>
        <h1>Test1</h1>
        <h1>Test1</h1>
        <h1>Test1</h1>
        <h1>Test1</h1>
        <h1>Test1</h1>
      </Modal>
    </>
  )
}

export default OpenModal
