import React from 'react'
import { alertColor } from '../../styles/tokens'
import { Intent } from './index'
import './alert.scss'

interface IIntents {
    error: string;
    warning: string;
    success: string;
    info: string;
}

interface IAlertProps {
    intent: keyof IIntents;
    message: string;
    onClose: () => void
}

export default function Alert({ intent, message, onClose }: IAlertProps) {
  const intents: IIntents = {
    error: alertColor.error,
    warning: alertColor.warning,
    success: alertColor.success,
    info: alertColor.info,
  }

  const bgColor = intents[intent] || intents[Intent.SUCCESS]

  return (
    <div className="alert" style={{ backgroundColor: bgColor }} onClick={onClose}>
      <span className="close-btn">&times;</span>
      {message}
    </div>
  )
}