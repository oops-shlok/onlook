import { useEditorEngine } from '@/components/Context';
import { CompoundStyle } from '@/lib/editor/styles/models';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import ColorInput from '../single/ColorInput';
import NumberUnitInput from '../single/NumberUnitInput';
import { set } from 'lodash';

const ShadowInput = observer(({ compoundStyle }: { compoundStyle: CompoundStyle }) => {
    const editorEngine = useEditorEngine();
    const [isShadowPopupOpen, setIsShadowPopupOpen] = useState(false);
    const [shadowValue, setShadowValue] = useState<string>('');
    const [shadowType, setShadowType] = useState<string>('drop-shadow');
    const [shadowPosition, setShadowPosition] = useState<string>('outside');
    const [shadowColor, setShadowColor] = useState<string>('');
    const [offsetX, setOffsetX] = useState<string>('0');
    const [offsetY, setOffsetY] = useState<string>('0');
    const [blur, setBlur] = useState<string>('0');
    const [spread, setSpread] = useState<string>('0');

    useEffect(() => {
        const selectedStyle = editorEngine.style.selectedStyle;
        if (!selectedStyle) {
            console.error('No style record found');
            return;
        }

        const shadowType = compoundStyle.children
            .find((child) => child.key === 'shadowType')
            ?.getValue(selectedStyle.styles);
        const shadowPosition = compoundStyle.children
            .find((child) => child.key === 'shadowPosition')
            ?.getValue(selectedStyle.styles);
        const colorValue = compoundStyle.children
            .find((child) => child.key === 'shadowColor')
            ?.getValue(selectedStyle.styles);
        const shadowX = compoundStyle.children
            .find((child) => child.key === 'shadowOffsetX')
            ?.getValue(selectedStyle.styles);
        const shadowY = compoundStyle.children
            .find((child) => child.key === 'shadowOffsetY')
            ?.getValue(selectedStyle.styles);
        const shadowBlur = compoundStyle.children
            .find((child) => child.key === 'shadowBlur')
            ?.getValue(selectedStyle.styles);
        const shadowSpread = compoundStyle.children
            .find((child) => child.key === 'shadowSpread')
            ?.getValue(selectedStyle.styles);

        setShadowType(shadowType || 'drop-shadow');
        setShadowPosition(shadowPosition || 'outside');
        setShadowColor(colorValue || '#000000');
        setOffsetX(shadowX || '0');
        setOffsetY(shadowY || '0');
        setBlur(shadowBlur || '0');
        setSpread(shadowSpread || '0');

        setShadowValue(
            `${colorValue}, ${shadowX || 0}px, ${shadowY || 0}px, ${shadowBlur || 0}px, ${shadowSpread || 0}px`,
        );
    }, [editorEngine.style.selectedStyle, compoundStyle]);

    function openShadowPopup() {
        setIsShadowPopupOpen(true);
    }

    function closeShadowPopup() {
        setIsShadowPopupOpen(false);
    }

    function handleSave() {
        const styleRecord = editorEngine.style.selectedStyle;
        if (!styleRecord) {
            return;
        }

        editorEngine.style.updateElementStyle('shadowColor', shadowColor);
        editorEngine.style.updateElementStyle('shadowOffsetX', offsetX);
        editorEngine.style.updateElementStyle('shadowOffsetY', offsetY);
        editorEngine.style.updateElementStyle('shadowBlur', blur);
        editorEngine.style.updateElementStyle('shadowSpread', spread);
        closeShadowPopup();
    }

    return (
        <div className="flex flex-col mb-2">
            <div className="flex flex-row items-center col-span-2">
                <p className="text-xs text-left text-foreground-onlook">Shadow</p>
                <div
                    className="ml-auto h-auto flex flex-row w-32 p-[6px] gap-2 rounded space-x-2 cursor-pointer bg-background-onlook/75"
                    onClick={openShadowPopup}
                >
                    <span className="text-xs border-none text-active bg-transparent text-start focus:outline-none focus:ring-0 ">
                        {shadowValue}
                    </span>
                </div>
            </div>

            {isShadowPopupOpen && (
                <div className="bg-white p-6 mt-3 border rounded-lg shadow-xl z-10">
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-row items-center justify-between gap-2">
                            <label className="text-xs text-left text-foreground-onlook">Type</label>
                            <div className="w-25">
                                <select
                                    className="text-xs border-none text-active text-start focus:outline-none focus:ring-0 w-28 p-[6px] flex flex-row rounded cursor-pointer bg-background-onlook/75"
                                    value={shadowType}
                                    onChange={(e) => {
                                        setShadowType(e.target.value);
                                    }}
                                >
                                    <option value="drop-shadow">Drop Shadow</option>
                                    <option value="box-shadow">Box Shadow</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-1">
                            <label className="text-xs text-left text-foreground-onlook">
                                Position
                            </label>
                            <div className="w-25">
                                <select
                                    className="text-xs border-none text-active text-start focus:outline-none focus:ring-0 w-28 p-[6px] flex flex-row rounded cursor-pointer bg-background-onlook/75"
                                    value={shadowPosition}
                                    onChange={(e) => {
                                        setShadowPosition(e.target.value);
                                    }}
                                >
                                    <option value="inside">Inside</option>
                                    <option value="outside">Outside</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-3">
                            <label className="text-xs text-left text-foreground-onlook">
                                Color
                            </label>
                            <div className="w-30">
                                <ColorInput
                                    elementStyle={
                                        compoundStyle.children.find(
                                            (child) => child.key === 'shadowColor',
                                        )!
                                    }
                                    onValueChange={(newColorValue: string) =>
                                        setShadowColor(newColorValue)
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-9">
                            <label className="text-xs text-left text-foreground-onlook">X</label>
                            <NumberUnitInput
                                elementStyle={compoundStyle.children[2]}
                                onValueChange={(newOffsetX: string) => setOffsetX(newOffsetX)}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between gap-9">
                            <label className="text-xs text-left text-foreground-onlook">Y</label>
                            <NumberUnitInput
                                elementStyle={compoundStyle.children[3]}
                                onValueChange={(newOffsetY: string) => setOffsetY(newOffsetY)}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between gap-6">
                            <label className="text-xs text-left text-foreground-onlook">Blur</label>

                            <NumberUnitInput
                                elementStyle={compoundStyle.children[4]}
                                onValueChange={(newBlur: string) => setBlur(newBlur)}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2">
                            <label className="text-xs text-left text-foreground-onlook">
                                Spread
                            </label>
                            <NumberUnitInput
                                elementStyle={compoundStyle.children[5]}
                                onValueChange={(newSpread: string) => setSpread(newSpread)}
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
                                className="bg-gray-300 rounded px-4 py-1 hover:bg-gray-400 transition"
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
