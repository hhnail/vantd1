import { Tree } from 'antd';
import React, { useState } from 'react';
const initTreeData = [
    {
        title: 'Expand to load',
        key: '0',
    },
    {
        title: 'Expand to load',
        key: '1',
    },
    {
        title: 'Tree Node',
        key: '2',
        isLeaf: true,
    },
];

const updateTreeData = (list, key, children) =>
    list.map((node) => {
        if (node.key === key) {
            return { ...node, children };
        }
        if (node.children) {
            return { ...node, children: updateTreeData(node.children, key, children) };
        }
        return node;
    });

/**
 * 表单配置
 * @returns {JSX.Element}
 * @constructor
 */
export default function FormConfig() {

    const [treeData, setTreeData] = useState(initTreeData);

    const onLoadData = ({ key, children }) =>
        new Promise((resolve) => {
            if (children) {
                resolve();
                return;
            }

            setTimeout(() => {
                setTreeData((origin) =>
                    updateTreeData(origin, key, [
                        {
                            title: 'Child Node',
                            key: `${key}-0`,
                        },
                        {
                            title: 'Child Node',
                            key: `${key}-1`,
                        },
                    ]),
                );
                resolve();
            }, 400);
        });

    return <>
        <Tree loadData={onLoadData} treeData={treeData} />
    </>
}
