import { useEditorEngine } from '@/components/Context';
import { CompoundStyle } from '@/lib/editor/styles/models';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import ColorInput from '../single/ColorInput';
import NumberUnitInput from '../single/NumberUnitInput';

const ShadowInput = observer(({ compoundStyle }: { compoundStyle: CompoundStyle }) => {
    const editorEngine = useEditorEngine();
    const [isShadowPopupOpen, setIsShadowPopupOpen] = useState(false);
    const [shadowType, setShadowType] = useState<string>('box-shadow');
    const [shadowPosition, setShadowPosition] = useState<string>('outside');
    const [shadowColor, setShadowColor] = useState<string>('');
    const [offsetX, setOffsetX] = useState<string>('0');
    const [offsetY, setOffsetY] = useState<string>('0');
    const [blur, setBlur] = useState<string>('0');
    const [spread, setSpread] = useState<string>('0');

    useEffect(() => {
        const selectedStyle = editorEngine.style.selectedStyle;
        if (!selectedStyle) {
            return;
        }

        const shadowColorValue = compoundStyle.children[2].getValue(selectedStyle.styles);
        const offsetXValue = compoundStyle.children[3].getValue(selectedStyle.styles);
        const offsetYValue = compoundStyle.children[4].getValue(selectedStyle.styles);
        const blurValue = compoundStyle.children[5].getValue(selectedStyle.styles);
        const spreadValue = compoundStyle.children[6].getValue(selectedStyle.styles);

        setShadowColor(shadowColorValue);
        setOffsetX(offsetXValue);
        setOffsetY(offsetYValue);
        setBlur(blurValue);
        setSpread(spreadValue);
    }, [editorEngine.style.selectedStyle, compoundStyle]);

    function openShadowPopup() {
        setIsShadowPopupOpen(true);
    }

    function closeShadowPopup() {
        setIsShadowPopupOpen(false);
    }

    function handleSave() {
        const selectedStyle = editorEngine.style.selectedStyle;
        if (!selectedStyle) {
            return;
        }

        const updatedShadowValue = `${shadowColor} ${offsetX} ${offsetY} ${blur} ${spread}`;
        editorEngine.style.updateElementStyle('boxShadow', updatedShadowValue);
    }

    function handleReset() {
        setShadowColor('');
        setOffsetX('0');
        setOffsetY('0');
        setBlur('0');
        setSpread('0');
        editorEngine.style.updateElementStyle('boxShadow', '');
    }

    return (
        <div className="flex flex-col mb-2">
            <div className="flex flex-row items-center col-span-2">
                <p className="text-xs text-left text-foreground-onlook">Shadow</p>
                <div
                    className="ml-auto h-auto flex flex-row w-32 p-[6px] gap-2 rounded space-x-2 cursor-pointer bg-background-onlook/75"
                    onClick={openShadowPopup}
                >
                    <span className="text-xs border-none text-active bg-transparent text-start focus:outline-none focus:ring-0">
                        {`${shadowColor} ${offsetX} ${offsetY} ${blur} ${spread}`}
                    </span>
                </div>
            </div>

            {isShadowPopupOpen && (
                <div className="bg-white p-6 mt-3 border rounded-lg shadow-xl z-10">
                    <div className="flex flex-col space-y-4">
                        {/* <div className="flex flex-row items-center justify-between gap-2">
                            <label className="text-xs text-left text-foreground-onlook">Type</label>
                            <select
                                className="text-xs border-none text-active text-start focus:outline-none focus:ring-0 w-28 p-[6px] flex flex-row rounded cursor-pointer bg-background-onlook/75"
                                value={shadowType}
                                onChange={(e) => setShadowType(e.target.value)}
                            >
                                <option value="drop-shadow">Drop Shadow</option>
                                <option value="box-shadow">Box Shadow</option>
                            </select>
                        </div> */}
                        {/* <div className="flex flex-row items-center justify-between gap-1">
                            <label className="text-xs text-left text-foreground-onlook">Position</label>
                            <select
                                className="text-xs border-none text-active text-start focus:outline-none focus:ring-0 w-28 p-[6px] flex flex-row rounded cursor-pointer bg-background-onlook/75"
                                value={shadowPosition}
                                onChange={(e) => setShadowPosition(e.target.value)}
                            >
                                <option value="inside">Inside</option>
                                <option value="outside">Outside</option>
                            </select>
                        </div> */}
                        <div className="flex flex-row items-center justify-between gap-3">
                            <label className="text-xs text-left text-foreground-onlook">
                                Color
                            </label>
                            <ColorInput
                                elementStyle={compoundStyle.children[2]}
                                onValueChange={setShadowColor}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between gap-9">
                            <label className="text-xs text-left text-foreground-onlook">X</label>
                            <NumberUnitInput
                                elementStyle={compoundStyle.children[3]}
                                onValueChange={setOffsetX}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between gap-9">
                            <label className="text-xs text-left text-foreground-onlook">Y</label>
                            <NumberUnitInput
                                elementStyle={compoundStyle.children[4]}
                                onValueChange={setOffsetY}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between gap-6">
                            <label className="text-xs text-left text-foreground-onlook">Blur</label>
                            <NumberUnitInput
                                elementStyle={compoundStyle.children[5]}
                                onValueChange={setBlur}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2">
                            <label className="text-xs text-left text-foreground-onlook">
                                Spread
                            </label>
                            <NumberUnitInput
                                elementStyle={compoundStyle.children[6]}
                                onValueChange={setSpread}
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white rounded px-4 py-1 hover:bg-blue-600 transition"
                            >
                                Save
                            </button>
                            <button
                                onClick={closeShadowPopup}
                                className="bg-red-500 text-white rounded px-4 py-1 hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});

export default ShadowInput;
