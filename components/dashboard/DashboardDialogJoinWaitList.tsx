import DashboardDialog from './DashboardDialog';
import api from '@dtravel/helpers/api/api';
import React, { ChangeEvent, useState } from 'react';

interface Props {
  children?: any;
}
const DashboardDialogJoinWaitList: React.FC<Props> = props => {
  const [open, setOpen] = useState<boolean>(false);
  const [isOpenJoined, setIsOpenJoined] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleOpenJoined = () => setIsOpenJoined(true);

  const handleCloseJoined = () => setIsOpenJoined(false);

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value.trim());
    setErrorMsg('');
  };

  const handleJoinTheWaitlist = async () => {
    try {
      if (!email) {
        setErrorMsg('Please enter your email');
        return;
      }

      const res = await api({
        method: 'post',
        url: 'https://api.dtravel.com/services/account/host-register',
        data: { email: email, type: 'HOST' },
      }).then(res => res.data);
      if (res.success) {
        handleClose(); // close current popup
        handleOpenJoined(); // open success popup
      } else {
        const { error } = res;
        setErrorMsg(error.desc);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        onClick={handleOpen}
        className="cursor-pointer"
        role="presentation"
        style={{ display: 'flex', alignItems: 'flex-start' }}
      >
        {props.children}
      </div>
      <DashboardDialog
        isOpen={open}
        handleClose={handleClose}
        title="Join the waitlist"
      >
        <div className={'dashboard-dialog-content'}>
          <p className="dashboard-dialog-text-content">
            In the coming months, we’ll enable more hosts to join the Dtravel
            platform and begin listing properties. Until then, you can join our
            waitlist to be one of the earliest to gain access.
          </p>
          <div className="email-input">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={onChangeEmail}
            />
            <div className={'text-red-6 mt-2 ml-2'}>{errorMsg}</div>
          </div>
          <div className="flex items-start">
            <div
              className="joinTheWaitlistBtn cursor-pointer"
              onClick={handleJoinTheWaitlist}
              role="presentation"
            >
              Join the waitlist
            </div>
          </div>
        </div>
      </DashboardDialog>

      <DashboardDialog
        isOpen={isOpenJoined}
        handleClose={handleCloseJoined}
        title="We’ve saved your spot"
      >
        <div className={'dashboard-dialog-content'}>
          <p className="dashboard-dialog-text-content">
            You’re on the list! Keep an eye on your inbox for a confirmation
            email with more info and for updates about when you can start
            hosting guests on the Dtravel network.
          </p>
          <p className="dashboard-dialog-text-content">
            To move up your spot in line, you can tell us more about your home
            sharing business by filling out a short questionnaire.
          </p>
          <div className="flex items-start mt-12">
            <a
              className="joinTheWaitlistBtn cursor-pointer"
              role="presentation"
              href={'https://d2bpe117hv9.typeform.com/to/GNzqpntk'}
            // target={'_blank'}
            // rel="noreferrer"
            >
              Start questionnaire
            </a>
          </div>
        </div>
      </DashboardDialog>
    </>
  );
};

export default DashboardDialogJoinWaitList;
