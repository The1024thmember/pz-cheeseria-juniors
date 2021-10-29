import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type Props = {
    open: boolean;
    onClose: any;
    title: string;
    content: string;
  };

const PopUp: React.FC<Props> = ({ open, onClose, title, content }) => {
    return (
        <Dialog 
          open={open}
          onClose={()=>onClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
        </Dialog>
    );
  };
  
  export default PopUp;
  