import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
class SpaceCommentList extends React.Component{
	render(){
		return (
			<div className="contents-table">
				<Table>
			    <TableHeader displaySelectAll={false} adjustForCheckbox={false} selectable={false} multiSelectable={false}>
			      <TableRow>
			        <TableHeaderColumn width="15%">标题</TableHeaderColumn>
			        <TableHeaderColumn width="15%">留言者</TableHeaderColumn>
			        <TableHeaderColumn width="15%">日期</TableHeaderColumn>
			        <TableHeaderColumn width="35%">留言</TableHeaderColumn>
			        <TableHeaderColumn>操作</TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
			    <TableBody displayRowCheckbox={false}>
			      <TableRow selectable={false}>
			        <TableRowColumn width="15%">Javascript闭包</TableRowColumn>
			        <TableRowColumn width="15%">路人甲</TableRowColumn>
			        <TableRowColumn width="15%">2017.3.14</TableRowColumn>
			        <TableRowColumn width="35%">卧槽，博主好帅好帅！巴拉巴拉。。</TableRowColumn>
			        <TableRowColumn>
			        	<RaisedButton label="删 除" />
			        </TableRowColumn>
			      </TableRow>
			      <TableRow selectable={false}>
			        <TableRowColumn width="15%">Javascript闭包</TableRowColumn>
			        <TableRowColumn width="15%">路人甲</TableRowColumn>
			        <TableRowColumn width="15%">2017.3.14</TableRowColumn>
			        <TableRowColumn width="35%">卧槽，博主好帅好帅！巴拉巴拉。。</TableRowColumn>
			        <TableRowColumn>
			        	<RaisedButton label="删 除" />
			        </TableRowColumn>
			      </TableRow>
			    </TableBody>
			  </Table>
			</div>
		)
	}
}
export default SpaceCommentList