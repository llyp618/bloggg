import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
class SpaceBlogList extends React.Component{
	render(){
		return (
			<div className="contents-table">
				 <Table>
			    <TableHeader displaySelectAll={false} adjustForCheckbox={false} selectable={false} multiSelectable={false}>
			      <TableRow>
			        <TableHeaderColumn>ID</TableHeaderColumn>
			        <TableHeaderColumn>标题</TableHeaderColumn>
			        <TableHeaderColumn>日期</TableHeaderColumn>
			        <TableHeaderColumn>操作</TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
			    <TableBody displayRowCheckbox={false}>
			      <TableRow selectable={false}>
			        <TableRowColumn>1</TableRowColumn>
			        <TableRowColumn>Javascript闭包</TableRowColumn>
			        <TableRowColumn>2017.3.14</TableRowColumn>
			        <TableRowColumn>
			        	<RaisedButton label="修 改" primary={true} />
			        	&nbsp;&nbsp;&nbsp;&nbsp;
			        	<RaisedButton label="删 除" />
			        </TableRowColumn>
			      </TableRow>
			      <TableRow selectable={false}>
			        <TableRowColumn>1</TableRowColumn>
			        <TableRowColumn>Javascript闭包</TableRowColumn>
			        <TableRowColumn>2017.3.14</TableRowColumn>
			        <TableRowColumn>
			        	<RaisedButton label="修 改" primary={true} />
			        	&nbsp;&nbsp;&nbsp;&nbsp;
			        	<RaisedButton label="删 除"  />
			        </TableRowColumn>
			      </TableRow>
			      <TableRow selectable={false}>
			        <TableRowColumn>1</TableRowColumn>
			        <TableRowColumn>Javascript闭包</TableRowColumn>
			        <TableRowColumn>2017.3.14</TableRowColumn>
			        <TableRowColumn>
			        	<RaisedButton label="修 改" primary={true} />
			        	&nbsp;&nbsp;&nbsp;&nbsp;
			        	<RaisedButton label="删 除"  />
			        </TableRowColumn>
			      </TableRow>
			    </TableBody>
			  </Table>
			</div>
		)
	}
}
export default SpaceBlogList