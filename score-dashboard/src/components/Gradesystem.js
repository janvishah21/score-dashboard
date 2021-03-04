import { gradeSystem } from '../util';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function GradeSystem() {

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead style={{ backgroundColor: 'lightgray' }}>
                    <TableRow>
                        <TableCell align="center">Percentage</TableCell>
                        <TableCell align="center">Grade</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {gradeSystem.map((row) => (
                        <TableRow>
                            <TableCell align="center">{row.min}-{row.max}</TableCell>
                            <TableCell align="center">{row.grade}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default GradeSystem
