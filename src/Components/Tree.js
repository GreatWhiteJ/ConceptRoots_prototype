import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import TreeView from "@material-ui/lab/TreeView";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import TreeItem from "@material-ui/lab/TreeItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }
});

export default function FileSystemNavigator(props) {
  const classes = useStyles();

  const [roots, setRoots] = useState([]);

  useEffect(() => {
    let refresh;
    refresh = db.collection("Roots").onSnapshot(snapshot => {
      const updated_roots = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        updated_roots.push({
          description: data.Description,
          name: data.Name,
          id: doc.id
        });
      });
      setRoots(updated_roots);
    });
    return refresh;
  }, []);

  return (
    // <TreeView
    //   className={classes.root}
    //   defaultCollapseIcon={<ExpandMoreIcon />}
    //   defaultExpandIcon={<ChevronRightIcon />}
    // >
    //   <TreeItem nodeId="CC-8-NS-A" label="Number System">
    <List className={classes.root} component="nav">
      {roots.map(value => {
        return (
          <ListItem
            key={value.id}
            role={undefined}
            dense
            button
            component={Link}
            to={"/app/" + value.id + "/"}
          >
            <ListItemText id={value.id} primary={value.name} />
          </ListItem>
        );
      })}
    </List>
    //   </TreeItem>
    //   <TreeItem nodeId="CC-8-EE-A" label="Expressions and equations">
    //     <TreeItem nodeId="CC-8-EE-A-RE" label="Radicals and Exponents">
    //       <TreeItem nodeId="CC-8-EE-1" label="Simplify exponent expressions" />
    //       <TreeItem nodeId="CC-8-EE-2" label="Roots of cubes and squares" />
    //       <TreeItem
    //         nodeId="CC-8-EE-3"
    //         label="Estimating with scientific notation"
    //       />
    //       <TreeItem
    //         nodeId="CC-8-EE-4"
    //         label="Operations with scientific notation and units"
    //       />
    //     </TreeItem>
    //     <TreeItem
    //       nodeId="CC-8-EE-A-PL"
    //       label="Proportions and Linear Relationships"
    //     >
    //       <TreeItem
    //         nodeId="CC-8-EE-5"
    //         label="Graphing proportional Relationships"
    //       />
    //       <TreeItem nodeId="CC-8-EE-6" label="Introduction to slope" />
    //     </TreeItem>
    //     <TreeItem nodeId="CC-8-EE-A-LE" label="Linear Equations">
    //       <TreeItem nodeId="CC-8-EE-A-LE-OV" label="One Variable Equations">
    //         <TreeItem
    //           nodeId="CC-8-EE-7a"
    //           label="Introduction to linear equations"
    //         />
    //         <TreeItem
    //           nodeId="CC-8-EE-7b"
    //           label="Distributive property and like terms"
    //         />
    //       </TreeItem>
    //       <TreeItem nodeId="1" label="Simultaneous Equations">
    //         <TreeItem
    //           nodeId="CC-8-EE-A-LE-SE"
    //           label="The intersection of two equations"
    //         />
    //         <TreeItem nodeId="CC-8-EE-8b" label="Solving algebraically" />
    //         <TreeItem nodeId="CC-8-EE-8c" label="Real world application" />
    //       </TreeItem>
    //     </TreeItem>
    //   </TreeItem>
    //   <TreeItem nodeId="CC-8-F-A" label="Functions">
    //     <TreeItem nodeId="CC-8-F-A-IF" label="Introduction to functions">
    //       <TreeItem nodeId="CC-8-F-1" label="What is a function?" />
    //       <TreeItem nodeId="CC-8-F-2" label="Comparing functions" />
    //       <TreeItem
    //         nodeId="CC-8-F-3"
    //         label="Introduction to non-linear functions"
    //       />
    //     </TreeItem>
    //     <TreeItem nodeId="CC-8-F-A-I" label="Functions and relationships">
    //       <TreeItem
    //         nodeId="CC-8-F-4"
    //         label="Modeling relationships with functions"
    //       />
    //       <TreeItem
    //         nodeId="CC-8-F-5"
    //         label="Interpreting graphs as relationships"
    //       />
    //     </TreeItem>
    //   </TreeItem>
    // </TreeView>
  );
}
